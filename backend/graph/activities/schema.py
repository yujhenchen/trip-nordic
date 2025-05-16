import graphene
from django.db.models import Q
from graphene_django.types import DjangoObjectType
from .models import Activity, FiFilters
from django.db.models.query import QuerySet

class ActivityType(DjangoObjectType):
    class Meta:
        model = Activity
        interfaces = (graphene.relay.Node, )
        
    seasons = graphene.List(graphene.String)
    categories = graphene.List(graphene.String)
        
    def resolve_seasons(self, info):
        return self.seasons if isinstance(self.seasons, list) else []
    
    def resolve_categories(self, info):
        return self.categories if isinstance(self.categories, list) else []	

    
class FiFiltersType(DjangoObjectType):
    class Meta:
        model = FiFilters
        interfaces = (graphene.relay.Node, )

    items = graphene.List(graphene.String)

    def resolve_items(self, info):
        return self.items if isinstance(self.items, list) else []
  

class ActivitiesEdge(graphene.ObjectType):
    cursor = graphene.ID()
    node = graphene.Field(ActivityType)


class ActivitiesConnection(graphene.ObjectType):
    totalCount = graphene.Int()
    edges = graphene.List(ActivitiesEdge)
    activities = graphene.List(ActivityType)
    pageInfo = graphene.Field(lambda: PageInfo)


class PageInfo(graphene.ObjectType):
    startCursor = graphene.String()
    endCursor = graphene.String()
    hasNextPage = graphene.Boolean()

    
class ActivityFilterInput(graphene.InputObjectType):
    ids = graphene.List(graphene.ID)
    categories = graphene.List(graphene.String)
    cities = graphene.List(graphene.String)
    regions = graphene.List(graphene.String)
    seasons = graphene.List(graphene.String)

def apply_filter(qs: QuerySet[Activity], field_name: str, values: list[str]):
    try:
        if values:
            filter_q = Q()
            for value in values:
                filter_q |= Q(**{f"{field_name}__icontains": value})
            qs = qs.filter(filter_q)
        return qs
    except Exception as e:
        print(e)
        

class Query(graphene.ObjectType):
    activities = graphene.Field(
        ActivitiesConnection,
        filters=ActivityFilterInput(),
        search=graphene.String(required=False),
        first=graphene.Int(required=False),
        offset=graphene.Int(required=False),
    )
    
    filters = graphene.List(FiFiltersType)
    
    def resolve_activities(self, info, filters=None, search=None, first=None, offset=None):
        qs = Activity.objects.all()
        # qs = qs.order_by('id')

        if filters:
            if filters.cities:
                qs = apply_filter(qs, 'city', filters.cities)
            
            if filters.regions:
                qs = apply_filter(qs, 'region', filters.regions)
            
            if filters.categories:
                qs = apply_filter(qs, 'categoriesstr', filters.categories)
                
            if filters.seasons:
                qs = apply_filter(qs, 'seasonsstr', filters.seasons)

        if search:
            qs = qs.filter(
                Q(description__icontains=search)
            )

        total_count = qs.count()

        # Use offset and first together for proper pagination
        if offset is not None and first is not None:
            qs = qs[offset:offset + first]
        elif offset is not None:
            qs = qs[offset:]
        elif first is not None:
            qs = qs[:first]

        activities = list(qs)

        edges = [
            ActivitiesEdge(cursor=str(activity.id), node=activity)
            for activity in activities
        ]

        # Determine if there are more pages
        has_next_page = total_count > (offset or 0) + len(activities)

        # Create pageInfo
        page_info = PageInfo(
            startCursor=str(activities[0].id) if activities else None,
            endCursor=str(activities[-1].id) if activities else None,
            hasNextPage=has_next_page
        )

        return ActivitiesConnection(
            totalCount=total_count,
            edges=edges,
            activities=[edge.node for edge in edges],
            pageInfo=page_info
        )

    def resolve_filters(self, info):
        return FiFilters.objects.all()

schema = graphene.Schema(query=Query)
