import strawberry
import uuid

from typing import List, TypeVar, Dict, Optional, Generic

@strawberry.type
class Activity:
    id: uuid.UUID
    categories: Optional[List[str]]
    city: str
    description: str
    name: str
    region: str
    seasons: List[str]
    
@strawberry.type
class FiFilters:
	name: str
	items: List[str]
