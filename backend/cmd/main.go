package main

import (
	"backend/clients"
	"backend/config"
	mongodb "backend/db"
	"context"
	"fmt"

	seModels "backend/models/activity_api/se"

	"go.mongodb.org/mongo-driver/bson"
	// activity_db "backend/models/activity_db/se"
	// "github.com/jinzhu/copier"
	// "go.mongodb.org/mongo-driver/bson"
)

// func getFIURL() string {
// 	fiUrl := config.GoDotEnvVariable("FI_ACTIVITY_URL")
// 	searchParams := utils.GetFIActivityParams()
// 	return fmt.Sprintf("%s?%s", fiUrl, searchParams)
// }

// func getSEURL() string {
// 	return config.GoDotEnvVariable("SE_ACTIVITY_URL")
// }

// func getNOURL() string {
// 	params := utils.GetNOActivityParams()

// 	// Create a URL object
// 	u, err := url.Parse(config.GoDotEnvVariable("NO_ACTIVITY_URL"))
// 	if err != nil {
// 		fmt.Println("Error parsing URL:", err)
// 		return ""
// 	}

// 	token, err := no.GetToken(config.GoDotEnvVariable("NO_TOKEN_URL"))
// 	if err != nil {
// 		fmt.Println("Failed to get NO token")
// 	}

// 	// Add query parameters
// 	q := u.Query()
// 	q.Set("json", params)
// 	q.Set("token", token)
// 	u.RawQuery = q.Encode()
// 	return u.String()
// }

// func getAPIs() {
// 	var wg sync.WaitGroup

// 	urls := map[string]interface{}{
// 		getFIURL(): &fiModels.Response{}, // `myStruct{}` is the instance of struct with default value
// 		getSEURL(): &seModels.Response{},
// 		getNOURL(): &noModels.Response{},
// 	}

// 	for url, responseType := range urls {
// 		wg.Add(1)
// 		go func(url string, response interface{}) {
// 			defer wg.Done()
// 			switch r := response.(type) { // type assertion
// 			case *fiModels.Response:
// 				data, err := clients.FetchAPIResponse(url, *r)
// 				if err != nil {
// 					fmt.Printf("get FI data error: %v", err)
// 				}
// 				fmt.Printf("Total Results: %d\n", data.Total)
// 			case *seModels.Response:
// 				data, err := clients.FetchAPIResponse(url, *r)
// 				if err != nil {
// 					fmt.Printf("get SE data error: %v", err)
// 				}
// 				fmt.Printf("Total Results: %d\n", len(data.Results))
// 			case *noModels.Response:
// 				data, err := clients.FetchAPIResponse(url, *r)
// 				if err != nil {
// 					fmt.Printf("get NO data error: %v", err)
// 				}
// 				fmt.Printf("Total Results: %d\n", len(data.Docs.Docs))
// 			}

// 		}(url, responseType)
// 	}
// 	wg.Wait()
// }

func main() {

	// getAPIs()

	// TODO: below is the version without WaitGroup, use benchmark to test the speed before and after
	// FI
	// fiUrl := config.GoDotEnvVariable("FI_ACTIVITY_URL")
	// searchParams := utils.GetFIActivityParams()
	// fiUrl = fmt.Sprintf("%s?%s", fiUrl, searchParams)
	// fiRes, _ := clients.FetchAPIResponse(fmt.Sprintf("%s?%s", fiUrl, searchParams), fiModels.Response{})
	// fmt.Printf("Total Results: %d\n", fiRes.Total)
	// for _, result := range fiRes.Results {
	// 	fmt.Printf("Name: %s, Region: %s\n", result.NameField, result.Region)
	// }

	// // SE
	// seUrl := config.GoDotEnvVariable("SE_ACTIVITY_URL")
	// seRes, _ := clients.FetchAPIResponse(seUrl, seModels.Response{})
	// fmt.Printf("Total Results: %d\n", len(seRes.Results))
	// for _, result := range seRes.Results {
	// 	fmt.Printf("Title: %s, Text: %s\n", result.Title, result.Text)
	// }

	// // NO get token
	// token, err := no.GetToken(config.GoDotEnvVariable("NO_TOKEN_URL"))
	// if err != nil {
	// 	fmt.Print(err)
	// }
	// // fmt.Printf("token is: %s\n", token)

	// // NO param
	// params := utils.GetNOActivityParams()

	// // Create a URL object
	// u, err := url.Parse(config.GoDotEnvVariable("NO_ACTIVITY_URL"))
	// if err != nil {
	// 	fmt.Println("Error parsing URL:", err)
	// 	return
	// }

	// // Add query parameters
	// q := u.Query()
	// q.Set("json", params)
	// q.Set("token", token)
	// u.RawQuery = q.Encode()

	// // Print the encoded URL
	// // fmt.Println(u.String())

	// noUrl := u.String()
	// noRes, _ := clients.FetchAPIResponse(noUrl, noModels.Response{})
	// fmt.Printf("Total Results: %d\n", len(noRes.Docs.Docs))
	// for _, result := range noRes.Docs.Docs {
	// 	fmt.Printf("Title: %s, Text: %s\n", result.Title, result.City)
	// }

	// client := mongo.ConnectDB()
	// activityDB := client.Database("activity_db")
	// fiCollection := activityDB.Collection("fi")
	// insertResult, err := fiCollection.InsertOne(context.TODO(), bson.D{
	// 	{Key: "Name", Value: "test Name"},
	// 	{Key: "Seasons", Value: "winter"},
	// 	{Key: "Region", Value: "north"},
	// })
	// if err != nil {
	// 	log.Println("There was an errr in trying to migrate the data into the database")
	// }
	// fmt.Println(insertResult.InsertedID)

	data := clients.GetSEAPIData()
	// fmt.Printf("result count %d", len(*results))

	uri := config.GoDotEnvVariable("MONGODB_URI")
	if uri == "" {
		fmt.Println("Cannot find uri")
	}
	client, err := mongodb.NewClient(uri)
	if err != nil {
		// panic is a built-in Go function that stops the ordinary flow of execution and starts panicking. It’s generally used for unrecoverable errors
		panic(err)
	}
	seCol := client.Database("activity_db").Collection("se")
	fmt.Println(seCol)

	// update 1 by 1
	// iterate results array
	// check if id exists, insert to database if not, update if exists
	for _, record := range *data {
		fmt.Println(record.ID)
		filter := bson.M{"ID": record.ID}
		var result seModels.Result
		seCol.FindOne(context.TODO(), filter).Decode(&result)
		fmt.Println(result.Categories.Data, result.Type)
		// if err != nil {
		// 	if err == mongo.ErrNoDocuments {
		// 		// fmt.Println("cannot find doc")
		// 		toInsert := activity_db.Result{
		// 			ID:            record.ID,
		// 			Title:         record.Title,
		// 			Href:          record.Href,
		// 			Text:          record.Text,
		// 			OriginalTitle: record.OriginalTitle,
		// 			Categories:    record.Categories,
		// 		}
		// 		doc, err := seCol.InsertOne(context.TODO(), toInsert)
		// 		if err != nil {
		// 			log.Fatalf("Failed to insert document: %v", err)
		// 		}
		// 		fmt.Println(doc)
		// 	} else {
		// 		log.Fatalf("FindOne error: %v", err)
		// 	}
		// } else {
		// 	// seCol.UpdateOne(context.TODO())
		// 	fmt.Println("found doc, update doc")
		// }
	}

	// map group of data into target struct
	// insert many
	// var toInsertArr []activity_db.Result
	// err = copier.Copy(&toInsertArr, dataArr)
	// if err != nil {
	// 	fmt.Printf("Error copying data: %v\n", err)
	// }
	// fmt.Println(len(toInsertArr))

	// // Convert to []interface{}
	// docs := make([]interface{}, len(toInsertArr))
	// for i, record := range toInsertArr {
	// 	docs[i] = record
	// }
	// results, err := seCol.InsertMany(context.TODO(), docs)
	// if err != nil {
	// 	fmt.Printf("Error inserting documents: %v\n", err)
	// }
	// fmt.Println(results)

	// // find one
	// filter := bson.M{"ID": 5141}
	// var result activity_db.Result
	// seCol.FindOne(context.TODO(), filter).Decode(&result)
	// fmt.Println(result.Categories)

	defer client.Disconnect(context.TODO())
}
