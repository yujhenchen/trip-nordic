from mongodb_client import MongoDBClient
from config import mongo_uri, mongo_db_name
from mongodb_utils import update_collection
from fi_filters_utils import get_fi_filters, format_fi_filters_documents

def main():
    db_client = MongoDBClient(mongo_uri, mongo_db_name)
    db_client.ping()
    
    # fi
    fi_filters = get_fi_filters(db_client)
    # print(fi_filters)
    docs = format_fi_filters_documents(fi_filters)
    update_collection(db_client, "activities_fi_filters", docs)

if __name__ == "__main__":
    main()
