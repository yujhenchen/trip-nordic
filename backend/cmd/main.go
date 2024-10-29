package main

import (
	"backend/clients"
	"fmt"
	"log"
)

func main() {
	fmt.Println("Hello, world.")

	// TODO: use env variables or something else to store the variables
	url := ""
	res, err := clients.FetchAPIResponse(url)
	if err != nil {
		log.Fatal("Error fetching API response: %v", err)
	}
	fmt.Printf("Total Results: %d\n", res.Total)
	for _, result := range res.Results {
		fmt.Printf("Name: %s, Region: %s\n", result.NameField, result.Region)
	}
}
