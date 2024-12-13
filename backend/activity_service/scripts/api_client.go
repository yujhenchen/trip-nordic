package scripts

import (
	"backend/config"
	"backend/models/api/fi"
	"backend/models/api/no"
	"backend/models/api/se"
	"backend/utils"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"regexp"
)

type ResponseType interface {
	fi.Response | se.Response | no.Response
}

// the res variable is a pointer (*http.Response) to a Go struct that contains details of the HTTP response.
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

func GetSEURL(page int) string {
	// return config.GoDotEnvVariable("SE_ACTIVITY_URL")
	url := fmt.Sprintf("%s?%s=%d", config.GoDotEnvVariable("SE_ACTIVITY_URL"), config.GoDotEnvVariable("SE_ACTIVITY_FIELDS"), page)
	return url
}

func GetNOToken(url string) (string, error) {
	res, err := http.Get(url)
	if err != nil {
		return "", err
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		return "", err
	}

	re := regexp.MustCompile(`"token":"([a-zA-Z0-9]+)"`)
	matches := re.FindStringSubmatch(string(body))

	if len(matches) < 2 {
		return "", fmt.Errorf("token not found")
	}
	return matches[1], nil
}

func GetNOURL() string {
	params := utils.GetNOActivityParams()

	// Create a URL object
	u, err := url.Parse(config.GoDotEnvVariable("NO_ACTIVITY_URL"))
	if err != nil {
		fmt.Println("Error parsing URL:", err)
		return ""
	}

	token, err := GetNOToken(config.GoDotEnvVariable("NO_TOKEN_URL"))
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

// fetch SE API data, return the pointer of the response struct
func GetSEAPIData(page int) (*se.Response, error) {
	data, err := FetchAPIResponse(GetSEURL(page), se.Response{})
	if err != nil {
		return nil, fmt.Errorf("get SE data error: %v", err)
	}
	// fmt.Printf("Total Results: %d\n", len(data.Results))
	return data, nil
}
