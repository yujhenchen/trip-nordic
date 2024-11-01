package main

import (
	"backend/clients"
	"fmt"
	"log"

	fiModels "backend/models/fi"
	seModels "backend/models/se"
)

func getFIData(url string) {
	var fiRes fiModels.Response
	res, err := clients.FetchAPIResponse(url, fiRes)
	if err != nil {
		log.Fatal("Error fetching API response: %v", err)
	}
	fmt.Printf("Total Results: %d\n", res.Total)
	for _, result := range res.Results {
		fmt.Printf("Name: %s, Region: %s\n", result.NameField, result.Region)
	}
}

func getSEData(url string) {
	var seRes seModels.Response
	res, err := clients.FetchAPIResponse(url, seRes)
	if err != nil {
		log.Fatal("Error fetching API response: %v", err)
	}
	fmt.Printf("Total Results: %d\n", len(res.Results))
	for _, result := range res.Results {
		fmt.Printf("Name: %s, Region: %s\n", result.Title, result.Text)
	}
}

func main() {
	// TODO: use env variables or something else to store the variables
	// url := ""
	// res, err := clients.FIFetchAPIResponse(url)
	// if err != nil {
	// 	log.Fatal("Error fetching API response: %v", err)
	// }
	// fmt.Printf("Total Results: %d\n", res.Total)
	// for _, result := range res.Results {
	// 	fmt.Printf("Name: %s, Region: %s\n", result.NameField, result.Region)
	// }
	fiUrl := ""
	getFIData(fiUrl)

	seUrl := ""
	getSEData(seUrl)
}
