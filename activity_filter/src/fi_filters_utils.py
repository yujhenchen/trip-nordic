from mongodb_client import MongoDBClient
from filters_extractor import extract_fi_filters
from config import fi_collection_name

def get_fi_filters(db_client: MongoDBClient) -> dict[str, list]:
    activities = db_client.find(fi_collection_name)
    filters = extract_fi_filters(activities)
    return filters

def format_fi_filters_documents(data: dict) -> list:
    documents = []
    for key, items in data.items():
        documents.append({"name": key, "items": items})
    return documents