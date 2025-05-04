from mongodb_client import MongoDBClient
from config import mongo_uri, mongo_db_name
from filters_extractor import extract_fi_filters

def get_fi_filters(db_client: MongoDBClient) -> dict[str, list]:
    activities = db_client.find("fi")
    filters = extract_fi_filters(activities)
    return filters

def update_collection(mongo_db_client: MongoDBClient, collection_name: str, docs: list[str]) -> None:
    collection = mongo_db_client.get_collection(collection_name)
    collection.delete_many({})    
    collection.insert_many(docs)

def format_fi_filters_documents(data: dict) -> list:
    documents = []
    for key, items in data.items():
        documents.append({"name": key, "items": items})
    return documents

def main():
    db_client = MongoDBClient(mongo_uri, mongo_db_name)
    db_client.ping()
    fi_filters = get_fi_filters(db_client)
    # print(fi_filters)
    
    docs = format_fi_filters_documents(fi_filters)
    update_collection(db_client, "fi_filters", docs)

if __name__ == "__main__":
    main()
