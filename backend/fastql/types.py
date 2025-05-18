import strawberry
import uuid

from typing import List, TypeVar, Optional, Dict, Any, Generic

@strawberry.type
class FiActivity:
    id: uuid.UUID
    categories: Optional[List[str]]
    city: str
    description: str
    name: str
    region: str
    seasons: List[str]
    
    @staticmethod
    def from_row(row: Dict[str, Any]):
        return FiActivity(
            id=row["id"], 
            categories=row["categories"], 
            city=row["city"], 
            description=row["description"],
            name=row["name"], 
            region=row["region"], 
            seasons=row["seasons"])
    
@strawberry.type
class FiFilters:
	name: str
	items: List[str]


Item = TypeVar("Item")

@strawberry.type
class PaginationWindow(Generic[Item]):
    items: List[Item] = strawberry.field(
        description="The list of items in this pagination window."
    )

    total_items_count: int = strawberry.field(
        description="Total number of items in the filtered dataset."
    )
