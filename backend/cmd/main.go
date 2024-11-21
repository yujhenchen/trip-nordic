package main

import (
	"backend/clients"
	"backend/config"
	mongodb "backend/db"
	activity_api "backend/models/activity_api/se"
	activity_db "backend/models/activity_db/se"
	"context"
	"fmt"
	"log"
	"sync"

	"github.com/jinzhu/copier"
)

func main() {
	initPage := 1
	res := clients.GetSEAPIData(initPage)
	pageCount := (res.Meta.TotalPages)

	var activities []activity_api.Result
	var wg sync.WaitGroup
	var mu sync.Mutex

	// fetch each page data from API
	activities = append(activities, res.Results...)
	for page := initPage + 1; page <= pageCount; page++ {
		wg.Add(1)
		go func(pageNum int) {
			defer wg.Done()
			res := clients.GetSEAPIData(page)

			mu.Lock()
			activities = append(activities, res.Results...)
			mu.Unlock()
		}(page)
	}
	wg.Wait()
	fmt.Println("activities count: ", len(activities))

	// map group of data into target struct
	var toInsertActivities []activity_db.Result
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
	client, err := mongodb.NewClient(uri)
	if err != nil {
		log.Fatal("Error, failed to start a new client", err)
		return
	}
	seCol := client.Database(config.GoDotEnvVariable("DB_NAME")).Collection("se")
	fmt.Println(seCol)

	// Convert to []interface{}
	docs := make([]interface{}, len(toInsertActivities))
	for i, record := range toInsertActivities {
		docs[i] = record
	}
	// insert many
	results, err := seCol.InsertMany(context.TODO(), docs)
	if err != nil {
		fmt.Printf("Error inserting documents: %v\n", err)
	}
	// fmt.Println(results)
	fmt.Println(len(results))

	defer client.Disconnect(context.TODO())
}
