import typing
import strawberry

from .utils import get_pagination_window

from .types import FiActivity, FiFilters, PaginationWindow

from .db import db_client
from .config import fi_collection_name, fi_filters_collection_name

@strawberry.type
class Query:
    @strawberry.field(description="Get a list of FI activities")
    async def fi_activities(
        self,
        order_by: typing.Optional[str] = None,
        limit: typing.Optional[int] = None,
        offset: typing.Optional[int] = None,
        ids: typing.Optional[typing.List[str]] = None,
        cities: typing.Optional[typing.List[str]] = None,
        regions : typing.Optional[typing.List[str]] = None,
		categories: typing.Optional[typing.List[str]] = None,
		seasons: typing.Optional[typing.List[str]] = None,
		keyword: typing.Optional[str] = None
  ) -> PaginationWindow[FiActivity]:        
        filters = {}
        
        if ids:
            filters["id"] = {"$in": ids}
        if cities:
            filters["city"] = {"$in": cities}
        if regions:
            filters["region"] = {"$in": regions}
        if categories:
            filters["categories"] = {"$in": categories}
        if seasons:
            filters["seasons"] = {"$in": seasons}
            
        if keyword:
            filters["$or"] = [
                {"name": {"$regex": keyword, "$options": "i"}},
                {"description": {"$regex": keyword, "$options": "i"}}
            ]
            
        documents, total_items_count = db_client.find(
            collection_name=fi_collection_name,
            filter=filters,
            limit=limit,
            offset=offset,
			order_by=order_by,
        )
        # print("total_items_count", total_items_count, "offset", offset, "limit", limit)          
        return get_pagination_window(
            dataset=documents,
            ItemType=FiActivity,
            total_items_count=total_items_count,
            )

    @strawberry.field(description="Get a list of FI activity filters")
    async def fi_activity_filters(self) -> typing.List[FiFilters]:
        documents, _ = db_client.find(fi_filters_collection_name)
        return [FiFilters(name=doc["name"], items=doc["items"]) for doc in documents]

schema = strawberry.Schema(query=Query)
