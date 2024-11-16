package main

import (
	"backend/clients"
	"backend/config"
	mongodb "backend/db"
	activity_db "backend/models/activity_db/se"
	"context"
	"fmt"
	"log"

	"github.com/jinzhu/copier"
	"go.mongodb.org/mongo-driver/bson"
)

func main() {
	data := clients.GetSEAPIData()

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

	// // update 1 by 1
	// // iterate results array
	// // check if id exists, insert to database if not, update if exists
	// for _, record := range *data {
	// 	fmt.Println(record.ID)
	// 	fmt.Println(record.Categories.Data, record.Type)
	// 	if str, ok := record.Categories.Data.(string); ok {
	// 		fmt.Printf("Data is a string: %s\n", str)
	// 	}
	// 	// Type assertion for []string
	// 	if strArr, ok := record.Categories.Data.([]string); ok {
	// 		fmt.Printf("Data is a []string: %v\n", strArr)
	// 	}

	// 	// if err != nil {
	// 	// 	if err == mongo.ErrNoDocuments {
	// 	// 		// fmt.Println("cannot find doc")
	// 	// 		toInsert := activity_db.Result{
	// 	// 			ID:            record.ID,
	// 	// 			Title:         record.Title,
	// 	// 			Href:          record.Href,
	// 	// 			Text:          record.Text,
	// 	// 			OriginalTitle: record.OriginalTitle,
	// 	// 			Categories:    record.Categories,
	// 	// 		}
	// 	// 		doc, err := seCol.InsertOne(context.TODO(), toInsert)
	// 	// 		if err != nil {
	// 	// 			log.Fatalf("Failed to insert document: %v", err)
	// 	// 		}
	// 	// 		fmt.Println(doc)
	// 	// 	} else {
	// 	// 		log.Fatalf("FindOne error: %v", err)
	// 	// 	}
	// 	// } else {
	// 	// 	// seCol.UpdateOne(context.TODO())
	// 	// 	fmt.Println("found doc, update doc")
	// 	// }
	// }

	// map group of data into target struct
	// insert many
	var toInsertArr []activity_db.Result
	err = copier.Copy(&toInsertArr, data)
	if err != nil {
		fmt.Printf("Error copying data: %v\n", err)
	}
	fmt.Println(len(toInsertArr))

	// Convert to []interface{}
	docs := make([]interface{}, len(toInsertArr))
	for i, record := range toInsertArr {
		docs[i] = record
	}
	results, err := seCol.InsertMany(context.TODO(), docs)
	if err != nil {
		fmt.Printf("Error inserting documents: %v\n", err)
	}
	fmt.Println(results)

	// find one
	filter := bson.M{"ID": 5141}
	var result activity_db.Result
	seCol.FindOne(context.TODO(), filter).Decode(&result)
	fmt.Println(result.Categories)

	defer client.Disconnect(context.TODO())
}
