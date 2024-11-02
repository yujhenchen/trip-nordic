package main

import (
	"backend/clients"
	"backend/clients/no"
	"backend/types"
	"fmt"
	"log"
	"net/url"
	"os"
	"strings"

	noModels "backend/models/no"

	"github.com/joho/godotenv"
)

func getData[T types.ResponseType](url string, response T) (*T, error) {
	// var seRes seModels.Response
	res, err := clients.FetchAPIResponse(url, response)
	if err != nil {
		log.Fatalf("Error fetching API response: %v", err)
		return res, fmt.Errorf("Error fetching API response: %v", err)
	}
	return res, nil
}

func goDotEnvVariable(key string) string {
	// load .env file
	err := godotenv.Load()

	if err != nil {
		log.Fatalf("Error loading .env file")
	}
	return os.Getenv(key)
}

func getNOActivityParams() string {
	filterTags := goDotEnvVariable("NO_ACTIVITY_FILTER_TAGS")
	calendarID := goDotEnvVariable("NO_ACTIVITY_CALENDAR_ID")
	categoryIDs := strings.Split(goDotEnvVariable("NO_ACTIVITY_CATEGORIES"), ",")
	startDate := goDotEnvVariable("NO_ACTIVITY_EVENT_DATE_GTE")
	endDate := goDotEnvVariable("NO_ACTIVITY_EVENT_DATE_LTE")
	limit := goDotEnvVariable("NO_ACTIVITY_OPTIONS_LIMIT")
	skip := goDotEnvVariable("NO_ACTIVITY_OPTIONS_SKIP")
	count := goDotEnvVariable("NO_ACTIVITY_OPTIONS_COUNT")
	castDocs := goDotEnvVariable("NO_ACTIVITY_OPTIONS_CAST_DOCS")
	fields := strings.Split(goDotEnvVariable("NO_ACTIVITY_FIELDS"), ",")

	// Constructing the JSON string
	jsonStr := fmt.Sprintf(`{"filter":{"$and":[{"filter_tags":{"$in":["%s"]}},{"calendarid":{"$in":["%s"]}},{"categories.catId":{"$in":["%s"]}}],"dates":{"$elemMatch":{"eventDate":{"$gte":{"$date":"%s"},"$lte":{"$date":"%s"}}}}},"options":{"limit":%s,"skip":%s,"count":%s,"castDocs":%s,"fields":{%s}}}`,
		filterTags,
		calendarID,
		strings.Join(categoryIDs, "\",\""),
		startDate,
		endDate,
		limit,
		skip,
		count,
		castDocs,
		formatFields(fields),
	)
	return jsonStr
}

func formatFields(fields []string) string {
	formattedFields := make([]string, len(fields))
	for i, field := range fields {
		formattedFields[i] = fmt.Sprintf("\"%s\":1", field)
	}
	return strings.Join(formattedFields, ",")
}

func main() {
	// FI
	// fiUrl := ""
	// fiRes, _ := getData(fiUrl, fiModels.Response{})
	// fmt.Printf("Total Results: %d\n", fiRes.Total)
	// for _, result := range fiRes.Results {
	// 	fmt.Printf("Name: %s, Region: %s\n", result.NameField, result.Region)
	// }

	// fmt.Println()

	// // SE
	// seUrl := ""
	// seRes, _ := getData(seUrl, seModels.Response{})
	// fmt.Printf("Total Results: %d\n", len(seRes.Results))
	// for _, result := range seRes.Results {
	// 	fmt.Printf("Title: %s, Text: %s\n", result.Title, result.Text)
	// }

	// NO get token
	token, err := no.GetToken(goDotEnvVariable("NO_TOKEN_URL"))
	if err != nil {
		fmt.Print(err)
	}
	fmt.Printf("token is: %s\n", token)

	// NO param
	params := getNOActivityParams()
	// `{"filter":{"$and":[{"filter_tags":{"$in":["site_primary"]}},{"calendarid":{"$in":["1"]}},{"categories.catId":{"$in":["31","12","13","32","2","3","1","4","30","25","5","14","6","15","7","19","20","8","27","9","28","21","29","24","10"]}}],"dates":{"$elemMatch":{"eventDate":{"$gte":{"$date":"2024-08-30T22:00:00.000Z"},"$lte":{"$date":"2025-09-05T22:00:00.000Z"}}}}},"options":{"limit":1,"skip":0,"count":true,"castDocs":false,"fields":{"categories":1,"description":1,"endDate":1,"host_id":1,"host.recid":1,"host.title":1,"host.detailURL":1,"latitude":1,"listing_id":1,"listing.recid":1,"listing.title":1,"listing.detailURL":1,"location":1,"city":1,"longitude":1,"_media.mediaurl":1,"_media.mediadesc":1,"nextDate":1,"rank":1,"recid":1,"recurType":1,"recurrence":1,"sites":1,"startDate":1,"title":1,"typeName":1,"loc":1,"url":1,"locale_code":1,"date":1,"udfs_object.47.value":1,"udfs_object.35.value":1}}}`

	// Create a URL object
	u, err := url.Parse(goDotEnvVariable("NO_ACTIVITY_URL"))
	if err != nil {
		fmt.Println("Error parsing URL:", err)
		return
	}

	// Add query parameters
	q := u.Query()
	q.Set("json", params)
	q.Set("token", token)
	u.RawQuery = q.Encode()

	// Print the encoded URL
	// fmt.Println(u.String())

	noUrl := u.String()
	noRes, _ := getData(noUrl, noModels.Response{})
	fmt.Printf("Total Results: %d\n", len(noRes.Docs.Docs))
	for _, result := range noRes.Docs.Docs {
		fmt.Printf("Title: %s, Text: %s\n", result.Title, result.City)
	}
}
