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
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// fetch SE API data by page
// from is the start page, to is the end page, if to is -1, set the end page to the total page
// return activities slice, and its underlying array will remain allocated in memory, ready for garbage collection when no longer needed
func getSEActivities(from, to int) []se.Result {
	var initPage int
	if from < 1 {
		initPage = 1
	} else {
		initPage = from
	}

	res := api.GetSEAPIData(initPage)
	var pageCount int
	if to == -1 {
		pageCount = res.Meta.TotalPages
	} else if to < initPage {
		pageCount = initPage
	} else {
		pageCount = to
	}

	// allocate a sufficient memory first to prevent memory re-allocation to increase performance
	// declare and initialize an empty slice, no pre-filled elements, grows up to pageCount-initPage+1 without reallocation
	activities := make([]se.Result, 0, pageCount-initPage+1)
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

func getActivitiesDocs(col *mongo.Collection, activities []db_se.Result) []primitive.M {
	var results []bson.M

	// get ids from the API result
	var ids []int
	for i := range activities {
		ids = append(ids, activities[i].ID)
	}
	// NOTE: field in document is different from struct
	filter := bson.M{"id": bson.M{"$in": ids}}
	seCur, err := col.Find(context.TODO(), filter)
	if err != nil {
		fmt.Printf("Error finding docs: %v\n", err)
	}
	defer seCur.Close(context.TODO())

	if err = seCur.All(context.TODO(), &results); err != nil {
		panic(err)
	}
	return results
}

func main() {
	initPage := 1
	activities := getSEActivities(initPage, 1)

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

	// upsert using bulk
	// TODO: performance: bulk vs insertMany
	// TODO: how does BulkWrite work?? when the data is the same ?? how does it know if the data are the same or not ??
	// TODO: can I use
	var bulkOps []mongo.WriteModel // TODO: what is mongo.WriteModel ??
	var activity db_se.Result
	for i := range activities {
		filter := bson.M{"id": activities[i].ID}
		err := copier.Copy(&activity, activities[i])
		if err != nil {
			fmt.Printf("Error copying data: %v\n", err)
		} else {
			hash, err := utils.GenerateHash(activity) // TODO: since json.Marshal(obj) has no order, which always get a new hash. Need to persist the hash when all fields in the object do not change
			if err != nil {
				fmt.Printf("Error GenerateHash activity: %v\n", activity.ID)
			} else {
				activity.Hash = hash
				update := bson.M{"$set": activity}                                                                       // TODO: what is $set, why use M here
				bulkOps = append(bulkOps, mongo.NewUpdateOneModel().SetFilter(filter).SetUpdate(update).SetUpsert(true)) // TODO: what is mongo.NewUpdateOneModel()
			}
		}
	}
	result, err := seCol.BulkWrite(context.TODO(), bulkOps)
	if err != nil {
		fmt.Printf("Error BulkWrite error: %v", err)
	}
	// TODO: why change the total pages get different ModifiedCount
	fmt.Printf("Matched: %d, Modified: %d, Upserted: %d\n", result.MatchedCount, result.ModifiedCount, result.UpsertedCount)
}
