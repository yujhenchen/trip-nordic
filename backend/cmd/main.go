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

func getFIURL() string {
	fiUrl := config.GoDotEnvVariable("FI_ACTIVITY_URL")
	searchParams := utils.GetFIActivityParams()
	return fmt.Sprintf("%s?%s", fiUrl, searchParams)
}

func getSEURL() string {
	return config.GoDotEnvVariable("SE_ACTIVITY_URL")
}

func getNOURL() string {
	params := utils.GetNOActivityParams()

	// Create a URL object
	u, err := url.Parse(config.GoDotEnvVariable("NO_ACTIVITY_URL"))
	if err != nil {
		fmt.Println("Error parsing URL:", err)
		return ""
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
	return u.String()
}

func main() {
	var wg sync.WaitGroup

	urls := map[string]interface{}{
		getFIURL(): &fiModels.Response{}, // `myStruct{}` is the instance of struct with default value
		getSEURL(): &seModels.Response{},
		getNOURL(): &noModels.Response{},
	}

	for url, responseType := range urls {
		wg.Add(1)
		go func(url string, response interface{}) {
			defer wg.Done()
			switch r := response.(type) { // type assertion
			case *fiModels.Response:
				data, err := clients.FetchAPIResponse(url, *r)
				if err != nil {
					fmt.Printf("get FI data error: %v", err)
				}
				fmt.Printf("Total Results: %d\n", data.Total)
			case *seModels.Response:
				data, err := clients.FetchAPIResponse(url, *r)
				if err != nil {
					fmt.Printf("get SE data error: %v", err)
				}
				fmt.Printf("Total Results: %d\n", len(data.Results))
			case *noModels.Response:
				data, err := clients.FetchAPIResponse(url, *r)
				if err != nil {
					fmt.Printf("get NO data error: %v", err)
				}
				fmt.Printf("Total Results: %d\n", len(data.Docs.Docs))
			}

		}(url, responseType)
	}
	wg.Wait()

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
}
