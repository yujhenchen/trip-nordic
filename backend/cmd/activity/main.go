package main

import (
	"backend/cmd/activity/api"
	"backend/config"

	// mongodb "backend/db"
	"backend/models/activity/api/se"
	db_se "backend/models/activity/mongo/se"
	"context"
	"fmt"
	"log"
	"sync"

	"github.com/jinzhu/copier"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	initPage := 1
	res := api.GetSEAPIData(initPage)
	pageCount := 2 // (res.Meta.TotalPages)

	var activities []se.Result
	var wg sync.WaitGroup
	var mu sync.Mutex

	// fetch each page data from API
	activities = append(activities, res.Results...)
	for page := initPage + 1; page <= pageCount; page++ {
		wg.Add(1)
		go func(pageNum int) {
			defer wg.Done()
			res := api.GetSEAPIData(page)

			mu.Lock()
			activities = append(activities, res.Results...)
			mu.Unlock()
		}(page)
	}
	wg.Wait()
	fmt.Println("activities count: ", len(activities))

	// map group of data into target struct
	var toInsertActivities []db_se.Result
	err := copier.Copy(&toInsertActivities, activities)
	if err != nil {
		fmt.Printf("Error copying data: %v\n", err)
	}
	fmt.Println(len(toInsertActivities))

	// connect to database
	uri := config.GoDotEnvVariable("MONGODB_URI")
	if uri == "" {
		log.Fatal("Error, cannot find uri")
		return
	}
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(uri).SetServerAPIOptions(serverAPI)
	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
		panic(err)
	}
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	// client: connection instance, access collection in the database, assigns the se collection reference to the seCol variable
	seCol := client.Database(config.GoDotEnvVariable("DB_NAME")).Collection("se")
	var seColActivities []bson.M

	// find documents that id in the ids array as foundDocs
	filter := bson.M{"ID": bson.M{"$in": []string{}}}
	seCur, err := seCol.Find(context.TODO(), filter)
	if err != nil {
		fmt.Printf("Error finding docs: %v\n", err)
	}
	defer seCur.Close(context.TODO())

	if err = seCur.All(context.TODO(), &seColActivities); err != nil {
		panic(err)
	}

	// (insert)
	// if foundDocs length === 0
	// calculate hash and insert api results into collection
	// else
	//, get the results that are not in the foundDocs
	// calculate hash and insert api results into collection
	//
	// (update)
	// if hash are not the same, update
	// else, do nothing
	if len(seColActivities) == 0 {
		fmt.Println("seColActivities is empty")
		// create hash for each element in toInsertActivities
		// insert all into collection
	} else {
		fmt.Printf("seColActivities len: %d", len(seColActivities))
	}

	// TODO: try not to convert to []interface, use bson.Marshal and Unmarshal instead
	// insert to api results into collection
	// Convert to []interface{}
	// docs := make([]interface{}, len(toInsertActivities))
	// for i, record := range toInsertActivities {
	// 	docs[i] = record
	// }
	// // insert many
	// results, err := seCol.InsertMany(context.TODO(), docs)
	// if err != nil {
	// 	fmt.Printf("Error inserting documents: %v\n", err)
	// }
	// // fmt.Println(results)
	// fmt.Println(len(results))
}
