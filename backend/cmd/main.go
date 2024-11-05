package main

import (
	"backend/clients"
	"backend/clients/no"
	"backend/config"
	"backend/utils"
	"fmt"
	"net/url"
	"sync"

	fiModels "backend/models/fi"
	noModels "backend/models/no"
	seModels "backend/models/se"
)

func main() {
	// TODO: if there is a package to do the Concurrency
	var wg sync.WaitGroup

	// FI
	fiUrl := config.GoDotEnvVariable("FI_ACTIVITY_URL")
	searchParams := utils.GetFIActivityParams()
	fiUrl = fmt.Sprintf("%s?%s", fiUrl, searchParams)

	// SE
	seUrl := config.GoDotEnvVariable("SE_ACTIVITY_URL")

	// NO
	params := utils.GetNOActivityParams()

	// Create a URL object
	u, err := url.Parse(config.GoDotEnvVariable("NO_ACTIVITY_URL"))
	if err != nil {
		fmt.Println("Error parsing URL:", err)
		return
	}

	token, err := no.GetToken(config.GoDotEnvVariable("NO_TOKEN_URL"))
	if err != nil {
		fmt.Println("Failed to get NO token")
	}

	// Add query parameters
	q := u.Query()
	q.Set("json", params)
	q.Set("token", token)
	u.RawQuery = q.Encode()
	noUrl := u.String()

	urls := map[string]interface{}{
		fiUrl: fiModels.Response{},
		seUrl: seModels.Response{},
		noUrl: noModels.Response{},
	}

	for url, responseType := range urls {
		wg.Add(1)
		go func(url string, response any) { // TODO: study this, change any to more specific
			defer wg.Done()
			switch r := response.(type) { // TODO: study this
			case fiModels.Response:
				data, err := clients.FetchAPIResponse(url, r)
				if err != nil {
					fmt.Printf("get FI data error: %v", err)
				}
				fmt.Printf("Total Results: %d\n", data.Total)
			case seModels.Response:
				data, err := clients.FetchAPIResponse(url, r)
				if err != nil {
					fmt.Printf("get SE data error: %v", err)
				}
				fmt.Printf("Total Results: %d\n", len(data.Results))
			case noModels.Response:
				data, err := clients.FetchAPIResponse(url, r)
				if err != nil {
					fmt.Printf("get NO data error: %v", err)
				}
				fmt.Printf("Total Results: %d\n", len(data.Docs.Docs))
			}

		}(url, responseType)
	}
	wg.Wait()

	// TODO: below are currently work version
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
}
