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

	fiModels "backend/models/fi"
	noModels "backend/models/no"
	seModels "backend/models/se"

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

func getFIActivityParams() string {
	fields := strings.Split(goDotEnvVariable("NO_ACTIVITY_FIELDS"), ",")
	params := make([]string, 0, len(fields))
	for _, field := range fields {
		var value string
		switch field {
		case "offset":
			value = goDotEnvVariable("FI_ACTIVITY_OFFSET")
		case "limit":
			value = goDotEnvVariable("FI_ACTIVITY_LIMIT")
		case "language":
			value = goDotEnvVariable("FI_ACTIVITY_LANGUAGE")
		case "category":
			value = goDotEnvVariable("FI_ACTIVITY_CATEGORY")
		}
		if value != "" {
			params = append(params, fmt.Sprintf("%s=%s", field, value))
		}
	}
	return strings.Join(params, "&")

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
	fiUrl := goDotEnvVariable("FI_ACTIVITY_URL")
	searchParams := getFIActivityParams()
	fiRes, _ := getData(fmt.Sprintf("%s?%s", fiUrl, searchParams), fiModels.Response{})
	fmt.Printf("Total Results: %d\n", fiRes.Total)
	for _, result := range fiRes.Results {
		fmt.Printf("Name: %s, Region: %s\n", result.NameField, result.Region)
	}

	// SE
	seUrl := goDotEnvVariable("SE_ACTIVITY_URL")
	seRes, _ := getData(seUrl, seModels.Response{})
	fmt.Printf("Total Results: %d\n", len(seRes.Results))
	for _, result := range seRes.Results {
		fmt.Printf("Title: %s, Text: %s\n", result.Title, result.Text)
	}

	// NO get token
	token, err := no.GetToken(goDotEnvVariable("NO_TOKEN_URL"))
	if err != nil {
		fmt.Print(err)
	}
	// fmt.Printf("token is: %s\n", token)

	// NO param
	params := getNOActivityParams()

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
