package clients

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	fiModels "backend/models/fi"
	noModels "backend/models/no"
	seModels "backend/models/se"
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
