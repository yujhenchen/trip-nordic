from mongodb_client import MongoDBClient
from filters_extractor import extract_fi_filters

def get_fi_filters(db_client: MongoDBClient) -> dict[str, list]:
    activities = db_client.find("fi")
    filters = extract_fi_filters(activities)
    return filters

def format_fi_filters_documents(data: dict) -> list:
    documents = []
    for key, items in data.items():
        documents.append({"name": key, "items": items})
    return documents