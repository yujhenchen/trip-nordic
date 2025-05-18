import typing
import strawberry

from .types import Activity, FiFilters

from .db import db_client
from .config import fi_collection_name, fi_filters_collection_name

@strawberry.type
class Query:
    @strawberry.field(description="Get a list of FI activities")
    async def fi_activities(self) -> typing.List[Activity]:
        documents = db_client.find(fi_collection_name)
        return [Activity(
            id=doc["id"],
			categories=doc["categories"],
			city=doc["city"],
			description=doc["description"],
			name=doc["name"],
			region=doc["region"],
			seasons=doc["seasons"],
            ) for doc in documents]
    
    @strawberry.field(description="Get a list of FI activity filters")
    async def fi_activity_filters(self) -> typing.List[FiFilters]:
        documents = db_client.find(fi_filters_collection_name)
        return [FiFilters(name=doc["name"], items=doc["items"]) for doc in documents]

schema = strawberry.Schema(query=Query)
