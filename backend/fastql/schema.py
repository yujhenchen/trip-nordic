import typing
import strawberry
import uuid

from .db import db_client
from .config import fi_collection_name, fi_filters_collection_name

@strawberry.type
class Activity:
    id: uuid.UUID
    categories: typing.Optional[typing.List[str]]
    city: str
    description: str
    name: str
    region: str
    seasons: typing.List[str]
    
@strawberry.type
class FiFilters:
	name: str
	items: typing.List[str]
    
@strawberry.type
class Query:
    @strawberry.field
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
    
    @strawberry.field
    async def fi_activity_filters(self) -> typing.List[FiFilters]:
        documents = db_client.find(fi_filters_collection_name)
        return [FiFilters(name=doc["name"], items=doc["items"]) for doc in documents]

schema = strawberry.Schema(query=Query)
