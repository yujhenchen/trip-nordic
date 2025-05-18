from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter

from .schema import schema
from .db import db_client

db_client.ping()
    
# Mount the schema in FastAPI
graphql_app = GraphQLRouter(schema)

app = FastAPI()
app.include_router(graphql_app, prefix="/graphql")

@app.get("/")
def read_root():
    return {"Hello": "World"}
