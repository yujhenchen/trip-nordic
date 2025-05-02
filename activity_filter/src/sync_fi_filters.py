from mongodb_client import MongoDBClient
from config import mongo_uri, mongo_db_name
from filters_extractor import extract_fi_filters

def sync_fi_filters(db_client):
    activities = db_client.find("fi")
    filters = extract_fi_filters(activities)
    return filters

# def update_collection(db_client, collection_name, data):
#     collection = db_client[collection_name]
#     collection.delete_many({})  # Delete all records
#     for item in data:
#         collection.insert_one({"name": item}) 

def main():
    db_client = MongoDBClient(mongo_uri, mongo_db_name)
    db_client.ping()
    fi_filters = sync_fi_filters(db_client)

if __name__ == "__main__":
    main()
