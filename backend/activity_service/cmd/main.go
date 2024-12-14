package main

import (
	"backend/config"
	mongodb "backend/mongo"
	"backend/scripts"
	"backend/utils"

	"backend/models/api/se"
	db_se "backend/models/mongo/se"
	"context"
	"fmt"
	"log"
	"sync"

	"github.com/jinzhu/copier"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// fetch SE API data by page
// from is the start page, to is the end page, if to is -1, set the end page to the total page
// return activities slice, and its underlying array will remain allocated in memory, ready for garbage collection when no longer needed
func getSEActivities(from, to int) ([]se.Result, []error, error) {
	if from < 1 {
		return nil, nil, fmt.Errorf("from page need to be greater than 1")
	}

	if to != -1 && to < from {
		return nil, nil, fmt.Errorf("to page need to be greater than from page")
	}
	initPage := from
	var pageCount int

	res, err := scripts.GetSEAPIData(initPage)
	if err != nil {
		return nil, nil, err
	}

	if to == -1 {
		pageCount = res.Meta.TotalPages
	} else {
		pageCount = to
	}

	// allocate a sufficient memory first to prevent memory re-allocation to increase performance
	// declare and initialize an empty slice, no pre-filled elements, grows up to pageCount-initPage+1 without reallocation
	activities := make([]se.Result, 0, pageCount-initPage+1)
	var wg sync.WaitGroup
	var mu sync.Mutex

	errs := make(chan error)
	// a signal mechanism since an empty struct uses no memory
	errsDone := make(chan struct{})
	resultErrs := []error{}

	go func() {
		for err := range errs {
			resultErrs = append(resultErrs, err)
		}
		errsDone <- struct{}{}
	}()

	// fetch each page data from API
	activities = append(activities, res.Results...)
	for page := initPage + 1; page <= pageCount; page++ {
		wg.Add(1)
		go func(pageNum int) {
			defer wg.Done()
			res, err = scripts.GetSEAPIData(page)
			if err != nil {
				errs <- fmt.Errorf("get SE API data error: %v", err)
			}
			mu.Lock()
			activities = append(activities, res.Results...)
			mu.Unlock()
		}(page)
	}
	wg.Wait()
	close(errs)

	// waits for the signal from the errsDone channel, ensuring that the main goroutine does not proceed until the error processing is complete
	<-errsDone
	return activities, resultErrs, err
}

// func getActivitiesDocs(col *mongo.Collection, activities []db_se.Result) []primitive.M {
// 	var results []bson.M
// 	// get ids from the API result
// 	var ids []int
// 	for i := range activities {
// 		ids = append(ids, activities[i].ID)
// 	}
// 	// NOTE: field in document is different from struct
// 	filter := bson.M{"id": bson.M{"$in": ids}}
// 	seCur, err := col.Find(context.TODO(), filter)
// 	if err != nil {
// 		fmt.Printf("Error finding docs: %v\n", err)
// 	}
// 	defer seCur.Close(context.TODO())
// 	if err = seCur.All(context.TODO(), &results); err != nil {
// 		panic(err)
// 	}
// 	return results
// }

func main() {
	config.LoadEnvFile()

	initPage := 1
	activities, errs, err := getSEActivities(initPage, -1)
	if len(errs) > 0 {
		log.Fatalf("Error getSEActivities errs: %v", errs)
	}
	if err != nil {
		log.Fatalf("Error getSEActivities error: %v", err)
	}

	// connect to database
	client, err := mongodb.NewConnection(config.GoDotEnvVariable("MONGODB_URI"), context.TODO())
	defer func() {
		if err = mongodb.CloseDB(client, context.TODO()); err != nil {
			log.Fatalf("Error disconnecting MongoDB client: %v", err)
		}
	}()
	if err != nil {
		log.Fatalf("Error establishing MongoDB connection: %v", err)
	}

	// client: connection instance, access collection in the database, assigns the se collection reference to the seCol variable
	seColl := client.Database(config.GoDotEnvVariable("DB_NAME")).Collection("se")

	// upsert using bulk
	// TODO: what is mongo.WriteModel ??
	bulkOps := make([]mongo.WriteModel, 0, len(activities))
	var activity db_se.Result
	for i := range activities {
		// TODO: how does memory work ??
		filter := bson.M{"id": activities[i].ID}
		// TODO: do I need copier.Copy first ??
		err := copier.Copy(&activity, activities[i])
		if err != nil {
			fmt.Printf("Error copying data: %v\n", err)
			// TODO: how to handle when this error happens in the loop
			continue
		}
		hash, err := utils.GenerateHash(activity)
		if err != nil {
			fmt.Printf("Error GenerateHash activity: %v\n", activity.ID)
			// TODO: how to handle when this error happens in the loop
			continue
		}
		// TODO: what is $set, why use M here
		// TODO: what is mongo.NewUpdateOneModel()
		// TODO: how does memory work ??
		activity.Hash = hash
		update := bson.M{"$set": activity}
		bulkOps = append(bulkOps, mongo.NewUpdateOneModel().SetFilter(filter).SetUpdate(update).SetUpsert(true))
	}
	result, err := seColl.BulkWrite(context.TODO(), bulkOps)
	if err != nil {
		log.Fatalf("Error BulkWrite error: %v", err)
	}
	// TODO: why change the total pages get different ModifiedCount
	fmt.Printf("Matched: %d, Modified: %d, Upserted: %d\n", result.MatchedCount, result.ModifiedCount, result.UpsertedCount)
}
