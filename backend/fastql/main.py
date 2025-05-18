from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter
from fastapi.middleware.cors import CORSMiddleware

from .schema import schema
from .db import db_client
from .config import cors_allowed_origins

db_client.ping()
    
# Mount the schema in FastAPI
graphql_app = GraphQLRouter(schema)

app = FastAPI()

origins = cors_allowed_origins.split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

app.include_router(graphql_app, prefix="/graphql")

@app.get("/")
def read_root():
    return {"Hello": "World"}
