from mongodb_client import MongoDBClient

def update_collection(mongo_db_client: MongoDBClient, collection_name: str, docs: list[str]) -> None:
    collection = mongo_db_client.get_collection(collection_name)
    collection.delete_many({})    
    collection.insert_many(docs)
    