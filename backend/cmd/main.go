package main

import (
	"backend/clients"
	"fmt"
	"log"

	fiModels "backend/models/fi"
	seModels "backend/models/se"
)

func getData[T seModels.Response | fiModels.Response](url string, response T) (*T, error) {
	// var seRes seModels.Response
	res, err := clients.FetchAPIResponse(url, response)
	if err != nil {
		log.Fatalf("Error fetching API response: %v", err)
		return res, fmt.Errorf("Error fetching API response: %v", err)
	}
	return res, nil
}

func main() {
	// FI
	fiUrl := ""
	fiRes, _ := getData(fiUrl, fiModels.Response{})
	fmt.Printf("Total Results: %d\n", fiRes.Total)
	for _, result := range fiRes.Results {
		fmt.Printf("Name: %s, Region: %s\n", result.NameField, result.Region)
	}

	fmt.Println()

	// SE
	seUrl := ""
	seRes, _ := getData(seUrl, seModels.Response{})
	fmt.Printf("Total Results: %d\n", len(seRes.Results))
	for _, result := range seRes.Results {
		fmt.Printf("Title: %s, Text: %s\n", result.Title, result.Text)
	}

	// NO

}
