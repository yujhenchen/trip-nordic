package main

import (
	"backend/clients"
	"backend/config"
	mongodb "backend/db"
	"context"
	"fmt"
	"log"

	seModels "backend/models/activity_api/se"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// "log"

// "go.mongodb.org/mongo-driver/bson"

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

	results := clients.GetSEAPIData()
	// fmt.Printf("result count %d", len(*results))

	uri := config.GoDotEnvVariable("MONGODB_URI")
	docs := "www.mongodb.com/docs/drivers/go/current/"
	if uri == "" {
		log.Fatal("Set your 'MONGODB_URI' environment variable. " +
			"See: " + docs +
			"usage-examples/#environment-variable")
	}
	client, err := mongodb.NewClient(uri)
	if err != nil {
		// panic is a built-in Go function that stops the ordinary flow of execution and starts panicking. It’s generally used for unrecoverable errors
		panic(err)
	}
	seCol := client.Database("activity_db").Collection("se")

	fmt.Println(seCol)

	// iterate results array
	// check if id exists, insert to database if not, update if exists
	for _, record := range *results {
		fmt.Println(record.ID)
		filter := bson.M{"ID": record.ID}
		err := seCol.FindOne(context.TODO(), filter).Decode(seModels.Result{})
		if err != nil {
			if err == mongo.ErrNoDocuments {
				// seCol.InsertOne(context.TODO())
				fmt.Println("cannot find doc")
			} else {
				log.Fatalf("FindOne error: %v", err)
			}
		} else {
			// seCol.UpdateOne(context.TODO())
			fmt.Println("found doc, update doc")
		}
	}
	defer client.Disconnect(context.TODO())
}
