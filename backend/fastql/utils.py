from typing import List, TypeVar, Optional
from .types import PaginationWindow

GenericType = TypeVar("GenericType")

def get_pagination_window(
    dataset: List[GenericType],
    ItemType: type,
    # limit: Optional[int] = 100,
    # offset: Optional[int] = 0,
    # NOTE: this has been implemented in the find() method of the mongodb_client
    # order_by: Optional[str] = None,
    # filters: dict[str, str] = {}, 
    total_items_count: int = 0
) -> PaginationWindow:
    """
    Get one pagination window on the given dataset for the given limit
    and offset, ordered by the given attribute and filtered using the
    given filters
    """
    # if limit is None:
    #     limit = 100
    # if offset is None:
    #     offset = 0

    # if limit <= 0 or limit > 100:
    #     raise Exception(f"limit ({limit}) must be between 0-100")

	# NOTE: this has been implemented in the find() method of the mongodb_client
    # if filters:
    #     dataset = list(filter(lambda x: matches(x, filters), dataset))
    # if order_by:
    #     dataset.sort(key=lambda x: x[order_by])

    # if offset != 0 and not 0 <= offset < len(dataset):
    #     raise Exception(f"offset ({offset}) is out of range " f"(0-{len(dataset) - 1})")

    # total_items_count = len(dataset)

    # items = dataset[offset : offset + limit]
    items = dataset

    items = [ItemType.from_row(x) for x in items]

    return PaginationWindow(items=items, total_items_count=total_items_count)


def matches(item, filters):
    """
    Test whether the item matches the given filters.
    This demo only supports filtering by string fields.
    """

    for attr_name, val in filters.items():
        if val not in item[attr_name]:
            return False
    return True
