package models

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

// TODO: 2024/10/29 20:55:25 Error fetching API response: %vfailed to parse JSON: json: cannot unmarshal array into Go struct field SEResult.results.categories of type models.StringOrStringArray
type StringOrStringArray struct {
	StringArray []string
	StringValue string
}

type SEResult struct {
	ID            int                 `json:"id"`
	Title         string              `json:"title"`
	Href          string              `json:"href"`
	Text          string              `json:"text"`
	Image         Image               `json:"image"`
	Live          bool                `json:"live"`
	Path          string              `json:"path"`
	Type          interface{}         `json:"type"`
	OriginalTitle string              `json:"original_title"`
	IsExternal    bool                `json:"is_external"`
	Categories    StringOrStringArray `json:"categories"`
}

type SEApiResponse struct {
	Results []SEResult `json:"results"`
	Meta    Meta       `json:"meta"`
	Facets  Facets     `json:"facets"`
}
