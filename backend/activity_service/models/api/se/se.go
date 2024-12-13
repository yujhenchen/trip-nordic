package se

import (
	"encoding/json"
)

type Image struct {
	AltText       *string                  `json:"alt_text"`
	Title         string                   `json:"title"`
	File          string                   `json:"file"`
	Width         int                      `json:"width"`
	Height        int                      `json:"height"`
	FileSize      int                      `json:"file_size"`
	Focal         Focal                    `json:"focal"`
	Src           string                   `json:"src"`
	Credits       string                   `json:"credits"`
	Caption       string                   `json:"caption"`
	ID            int                      `json:"id"`
	LocalMetaData map[string]LocalizedData `json:"local_meta_data"`
}

type Focal struct {
	X string `json:"x"`
	Y string `json:"y"`
}

type LocalizedData struct {
	Title    string `json:"title"`
	Caption  string `json:"caption"`
	AltText  string `json:"alt_text"`
	Location string `json:"location"`
}

type Meta struct {
	TotalPages   int     `json:"total_pages"`
	TotalHits    int     `json:"total_hits"`
	ShownHits    int     `json:"shown_hits"`
	PreviousLink *string `json:"previous_link"`
	NextLink     *string `json:"next_link"`
	Previous     *int    `json:"previous"`
	Next         *int    `json:"next"`
}

type Facets struct {
	RootCategories []Category `json:"root_categories"`
	Regions        []Region   `json:"regions"`
	EndCategories  []Category `json:"end_categories"`
}

type Category struct {
	Title string `json:"title"`
	Count int    `json:"count"`
	Path  string `json:"path"`
}

type Region struct {
	Title string `json:"title"`
	Count int    `json:"count"`
	Key   string `json:"key"`
	Path  string `json:"path"`
}

// Custom Categories type to handle both string and []string
type Categories struct {
	Data interface{}
}

// TODO: handle when error is not nil
func (c *Categories) UnmarshalJSON(data []byte) error {
	// Attempt to unmarshal into []string
	var strArray []string
	if err := json.Unmarshal(data, &strArray); err == nil {
		c.Data = strArray
		// fmt.Println("Unmarshaled into []string:", strArray) // Debug output
		return nil
	}

	// If unmarshaling into []string fails, try unmarshaling into a string
	var str string
	if err := json.Unmarshal(data, &str); err == nil {
		c.Data = str
		// fmt.Println("Unmarshaled into string:", str) // Debug output
		return nil
	}

	// If both attempts fail, return an error
	// return fmt.Errorf("categories field must be either a string or an array of strings")
	return nil
}

type Result struct {
	ID            int         `json:"id"`
	Title         string      `json:"title"`
	Href          string      `json:"href"`
	Text          string      `json:"text"`
	Image         Image       `json:"image"`
	Live          bool        `json:"live"`
	Path          string      `json:"path"`
	Type          interface{} `json:"type"`
	OriginalTitle string      `json:"original_title"`
	IsExternal    bool        `json:"is_external"`
	Categories    Categories  `json:"categories"` // FIX ME: this is either []string or string
}

type Response struct {
	Results []Result `json:"results"`
	Meta    Meta     `json:"meta"`
	Facets  Facets   `json:"facets"`
}
