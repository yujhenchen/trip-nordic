package main

import (
	"fmt"
	"log"

	"backend/models"
	"encoding/json"
	"io"
	"net/http"
	// "backend/clients/fi_activity_client"
)

// TODO: remove this one, use import module instead "backend/clients/fi_activity_client"
// TODO: fix response struct error 2024/10/29 06:42:43 Error fetching API response: %v failed to parse JSON: json: cannot unmarshal string into Go struct field Result.results.image of type models.Image
func fetchAPIResponse(url string) (*models.ApiResponse, error) {
	res, err := http.Get(url)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch data: %v", err)
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response body: %v", err)
	}
	var apiResponse models.ApiResponse
	if err := json.Unmarshal(body, &apiResponse); err != nil {
		return nil, fmt.Errorf("failed to parse JSON: %v", err)
	}

	return &apiResponse, nil
}

func main() {
	fmt.Println("Hello, world.")

	url := "" // TODO: move url to config or env file something
	// res, err := fi_activity_client.fetchAPIResponse(url)
	res, err := fetchAPIResponse(url)
	if err != nil {
		log.Fatal("Error fetching API response: %v", err)
	}
	fmt.Printf("Total Results: %d\n", res.Total)
	for _, result := range res.Results {
		fmt.Printf("Name: %s, Region: %s\n", result.NameField, result.Region)
	}
}
