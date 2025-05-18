package main

import (
	"backend/config"
	"backend/models/fi"
	mongodb "backend/mongo"
	"backend/scripts"
	"backend/utils"
	"context"
	"fmt"
	"log"
	"sync"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func getFIData(limit int) (*[]fi.Result, error) {
	if limit < 1 {
		return nil, fmt.Errorf("limit need to be at least 1")
	}
	language := "en"
	res, err := scripts.GetFIAPIData(limit, language)
	if err != nil {
		return nil, err
	}
	return &res.Results, nil
}

func getMappedResult(r fi.Result) fi.MappedResult {
	categories := utils.SplitAndTrim(r.Category)
	seasons := utils.SplitAndTrim(r.Seasons)

	return fi.MappedResult{
		ID:          r.ID,
		Name:        r.NameEN,
		Description: r.DescriptionEN,
		Region:      utils.CapitalizeFirstLetter(r.Region),
		City:        utils.CapitalizeFirstLetter(r.City),
		Categories:  categories,
		Seasons:     seasons,
		// CategoriesStr: strings.Join(categories, ","),
		// SeasonsStr:    strings.Join(seasons, ","),
	}
}

func main() {
	config.LoadEnvFile()

	data, err := getFIData(10000)
	if err != nil {
		log.Fatalf("Error getFIData error: %v", err)
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
	fiColl := client.Database(config.GoDotEnvVariable("DB_NAME")).Collection("activities_fi")

	// mongo.WriteModel: write models is used to specify replace and update operations
	bulkOps := make([]mongo.WriteModel, 0, len(*data))

	var wg sync.WaitGroup
	var mu sync.Mutex
	for i := range *data {
		wg.Add(1)
		go func(idx int) {
			defer wg.Done()

			original := (*data)[idx]
			mapped := getMappedResult(original)

			filter := bson.D{{Key: "id", Value: original.ID}}
			update := bson.D{{Key: "$set", Value: mapped}}

			mu.Lock()
			bulkOps = append(bulkOps, mongo.NewUpdateOneModel().SetFilter(filter).SetUpdate(update).SetUpsert(true))
			mu.Unlock()
		}(i)
	}
	wg.Wait()

	result, err := fiColl.BulkWrite(context.TODO(), bulkOps)
	if err != nil {
		log.Fatalf("Error BulkWrite error: %v", err)
	}
	fmt.Printf("Matched: %d, Modified: %d, Upserted: %d\n", result.MatchedCount, result.ModifiedCount, result.UpsertedCount)

}
