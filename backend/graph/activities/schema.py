import graphene
from django.db.models import Q
from graphene_django.types import DjangoObjectType
from .models import Activity, FiFilters
from django.db.models.query import QuerySet

class ActivityType(DjangoObjectType):
    class Meta:
        model = Activity
        interfaces = (graphene.relay.Node, )
    
    activities = graphene.List(lambda: ActivityType)
    
    def resolve_activities(self, info):
        return self.activities.all()
    
class FiFiltersType(DjangoObjectType):
	class Meta:
		model = FiFilters
		interfaces = (graphene.relay.Node, )
  
	filters = graphene.List(lambda: FiFiltersType)
  
	def resolve_filters(self, info):
		return self.filters.all()
  

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
    if values:
        filter_q = Q()
        for value in values:
            filter_q &= Q(**{f"{field_name}__contains": value})
        qs = qs.filter(filter_q)
    return qs
        

class Query(graphene.ObjectType):
    activities = graphene.Field(
        ActivitiesConnection,
        filters=ActivityFilterInput(),
        search=graphene.String(required=False),
        first=graphene.Int(required=False),
        offset=graphene.Int(required=False),
    )
    
    filters = graphene.List(FiFiltersType)
    
    def resolve_all_activities(self, info):
        return Activity.objects.all()

    def resolve_activities(self, info, filters=None, search=None, first=None, offset=None):
        qs = Activity.objects.all()
        # qs = qs.order_by('id')

        if filters:
            if filters.ids:
                qs = qs.filter(id__in=filters.ids)
            
            if filters.categories:
                qs = apply_filter(qs, 'category', filters.categories)
            
            if filters.cities:
                qs = apply_filter(qs, 'city', filters.cities)
            
            if filters.regions:
                qs = apply_filter(qs, 'region', filters.regions)
            
            if filters.seasons:
                qs = apply_filter(qs, 'seasons', filters.seasons)

        if search:
            qs = qs.filter(
                Q(url__icontains=search) |
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
