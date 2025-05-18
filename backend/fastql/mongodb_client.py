from pymongo import MongoClient

class MongoDBClient:
    def __init__(self, altas_uri, dbname):
        self.mongodb_client = MongoClient(altas_uri)
        self.database = self.mongodb_client[dbname]

    def ping(self):
        self.mongodb_client.admin.command('ping')

    def get_collection(self, collection_name):
        collection = self.database[collection_name]
        return collection

    def find (self, collection_name, filter = {}, order_by=None, sort_direction=1):
        collection = self.database[collection_name]
        cursor = collection.find(filter=filter)
        if order_by:
            cursor = cursor.sort(order_by, sort_direction)
        items = list(cursor)
        return items
    
    """
    Retrieve documents from a MongoDB collection with optional filtering, sorting, pagination.
    Applying limit and offset affects the total count of documents
    """
    # def find (self, collection_name, filter = {}, limit=0, offset=0, order_by=None, sort_direction=1):
    #     collection = self.database[collection_name]
    #     cursor = collection.find(filter=filter)
        
    #     if order_by:
    #         cursor = cursor.sort(order_by, sort_direction)
            
    #     if offset:
    #         cursor = cursor.skip(offset)
        
    #     if limit:
    #         cursor = cursor.limit(limit)
        
    #     return list(cursor)
