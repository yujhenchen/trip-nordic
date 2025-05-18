from .mongodb_client import MongoDBClient
from .config import mongo_uri, mongo_db_name

db_client = MongoDBClient(mongo_uri, mongo_db_name)
