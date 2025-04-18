import graphene
from django.db.models import Q
from graphene_django.types import DjangoObjectType
from .models import Activity

class ActivityType(DjangoObjectType):
    class Meta:
        model = Activity
        interfaces = (graphene.relay.Node, )
    
    activities = graphene.List(lambda: ActivityType)
    
    def resolve_activities(self, info):
        return self.activities.all()


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


class Query(graphene.ObjectType):
    activities = graphene.Field(
        ActivitiesConnection,
        search=graphene.String(required=False),
        first=graphene.Int(required=False),
        offset=graphene.Int(required=False),
    )
    
    def resolve_all_activities(self, info):
        return Activity.objects.all()

    def resolve_activities(self, info, search=None, first=None, offset=None):
        qs = Activity.objects.all()
        # qs = qs.order_by('id')
        
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
        has_next_page = total_count > (offset or 0) + len(qs)

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


schema = graphene.Schema(query=Query)
