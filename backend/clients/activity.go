package clients

import (
	"backend/types"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

func FetchAPIResponse[T types.ResponseType](url string, response T) (*T, error) {
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
