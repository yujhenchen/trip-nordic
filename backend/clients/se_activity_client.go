package clients

import (
	"backend/models"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

func SEFetchAPIResponse(url string) (*models.SEApiResponse, error) {
	res, err := http.Get(url)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch data: %v", err)
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response body: %v", err)
	}
	var apiResponse models.SEApiResponse
	if err := json.Unmarshal(body, &apiResponse); err != nil {
		return nil, fmt.Errorf("failed to parse JSON: %v", err)
	}

	return &apiResponse, nil
}
