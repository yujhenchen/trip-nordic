package activity

import (
	"backend/config"
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type Database interface {
	Collection(string) Collection
	Client() Client
}

type Collection interface {
	FindOne(context.Context, interface{}) SingleResult
	InsertOne(context.Context, interface{}) (interface{}, error)
	InsertMany(context.Context, []interface{}) ([]interface{}, error)
	DeleteOne(context.Context, interface{}) (int64, error)
	Find(context.Context, interface{}, ...*options.FindOptions) (Cursor, error)
	CountDocuments(context.Context, interface{}, ...*options.CountOptions) (int64, error)
	Aggregate(context.Context, interface{}) (Cursor, error)
	UpdateOne(context.Context, interface{}, interface{}, ...*options.UpdateOptions) (*mongo.UpdateResult, error)
	UpdateMany(context.Context, interface{}, interface{}, ...*options.UpdateOptions) (*mongo.UpdateResult, error)
}

type SingleResult interface {
}

type Cursor interface {
}

type Client interface {
}

func ConnectDB() *mongo.Client {
	uri := config.GoDotEnvVariable("MONGODB_URI")
	docs := "www.mongodb.com/docs/drivers/go/current/"
	if uri == "" {
		log.Fatal("Set your 'MONGODB_URI' environment variable. " +
			"See: " + docs +
			"usage-examples/#environment-variable")
	}
	// create a new client instance that connects to MongoDB
	// options.Client function creates a configuration for the MongoDB client
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		// panic is a built-in Go function that stops the ordinary flow of execution and starts panicking. It’s generally used for unrecoverable errors
		panic(err)
	}

	// validate connection
	err = client.Ping(context.TODO(), readpref.Primary())
	if err != nil {
		log.Fatal(err)
	}

	// defer schedules a function to be run at the end of the enclosing function
	// defer func() { // TODO: what is defer
	// 	// if statement that checks for an error after calling client.Disconnect
	// 	if err := client.Disconnect(context.TODO()); err != nil { // TODO: why there is a ;
	// 		panic(err)
	// 	}
	// }()
	return client
}
