import os
from dotenv import dotenv_values

config = dotenv_values(os.path.join("..", ".env"))

mongo_username = config.get("MONGO_USERNAME")
mongo_password = config.get("MONGO_PASSWORD")
mongo_cluster = config.get("MONGO_CLUSTER")
mongo_options = config.get("MONGO_OPTIONS")
mongo_db_name = config.get("MONGO_DB_NAME")

# Check if any variable is None and handle accordingly
if not all([mongo_username, mongo_password, mongo_cluster, mongo_options, mongo_db_name]):
    raise ValueError("One or more required environment variables are missing")

# Construct the MongoDB URI
mongo_uri = f"mongodb+srv://{mongo_username}:{mongo_password}@{mongo_cluster}/?{mongo_options}"
print(mongo_uri)