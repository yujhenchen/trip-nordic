package clients

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"

	"backend/clients/no"
	"backend/config"
	fiModels "backend/models/activity_api/fi"
	noModels "backend/models/activity_api/no"
	seModels "backend/models/activity_api/se"
	"backend/utils"
)

type ResponseType interface {
	fiModels.Response | seModels.Response | noModels.Response
}

func FetchAPIResponse[T ResponseType](url string, response T) (*T, error) {
	res, err := http.Get(url)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch data: %v", err)
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response body: %v", err)
	}
	if err := json.Unmarshal(body, &response); err != nil {
		return nil, fmt.Errorf("failed to parse JSON: %v", err)
	}
	return &response, nil
}

// get API urls
func GetFIURL() string {
	fiUrl := config.GoDotEnvVariable("FI_ACTIVITY_URL")
	searchParams := utils.GetFIActivityParams()
	return fmt.Sprintf("%s?%s", fiUrl, searchParams)
}

func GetSEURL() string {
	return config.GoDotEnvVariable("SE_ACTIVITY_URL")
}

func GetNOURL() string {
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

// get api, connect to DB and insert data
func GetSEAPIData() *[]seModels.Result {
	data, err := FetchAPIResponse(GetSEURL(), seModels.Response{})
	if err != nil {
		fmt.Printf("get SE data error: %v", err)
	}
	fmt.Printf("Total Results: %d\n", len(data.Results))
	return &data.Results
}
