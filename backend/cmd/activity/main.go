package main

import (
	"backend/cmd/activity/api"
	"backend/config"
	"backend/utils"

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

func getActivities(from, to int) []se.Result {
	initPage := from
	res := api.GetSEAPIData(initPage)
	var pageCount int
	if to == -1 {
		pageCount = res.Meta.TotalPages
	} else {
		pageCount = to
	}

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
	// fmt.Println("activities count: ", len(activities))
	return activities
}

func main() {
	// TODO: disconnect DB and exist program when error happens
	initPage := 1
	activities := getActivities(initPage, 3)

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
	// var seColActivities []bson.M

	// // get ids from the API result
	// var toInsertIDs []int
	// for idx := range toInsertActivities {
	// 	toInsertIDs = append(toInsertIDs, toInsertActivities[idx].ID)
	// }
	// // NOTE: field in document is different from struct
	// filter := bson.M{"id": bson.M{"$in": toInsertIDs}}
	// seCur, err := seCol.Find(context.TODO(), filter)
	// if err != nil {
	// 	fmt.Printf("Error finding docs: %v\n", err)
	// }
	// defer seCur.Close(context.TODO())

	// if err = seCur.All(context.TODO(), &seColActivities); err != nil {
	// 	panic(err)
	// }

	// create hash
	for idx := range toInsertActivities {
		hash, err := utils.GenerateHash(toInsertActivities[idx])
		if err != nil {
			fmt.Printf("Error GenerateHash for element: %v", toInsertActivities[idx])
		}
		toInsertActivities[idx].Hash = hash
	}

	var bulkOps []mongo.WriteModel
	for i := range toInsertActivities {
		filter := bson.M{"id": toInsertActivities[i].ID}
		update := bson.M{"$set": toInsertActivities[i]} // TODO: what is $set, why use M here

		bulkOps = append(bulkOps, mongo.NewUpdateOneModel().SetFilter(filter).SetUpdate(update).SetUpsert(true)) // TODO: what is mongo.NewUpdateOneModel()
	}
	result, err := seCol.BulkWrite(context.TODO(), bulkOps)
	if err != nil {
		fmt.Printf("Error BulkWrite error: %v", err)
	}
	fmt.Printf("Matched: %d, Modified: %d, Upserted: %d\n", result.MatchedCount, result.ModifiedCount, result.UpsertedCount)
}
