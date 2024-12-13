package no

// ApiResponse represents the top-level structure of the API response.
type Response struct {
	Docs Docs `json:"docs"`
}

// Docs holds the count and the list of events.
type Docs struct {
	Count int     `json:"count"`
	Docs  []Event `json:"docs"`
}

// Event represents an individual event with all its properties.
type Event struct {
	Categories  []Category     `json:"categories"`
	Description string         `json:"description"`
	EndDate     string         `json:"endDate"`
	Latitude    float64        `json:"latitude"`
	Location    string         `json:"location"`
	City        string         `json:"city"`
	Longitude   float64        `json:"longitude"`
	Media       []Media        `json:"_media"`
	NextDate    string         `json:"nextDate"`
	Rank        int            `json:"rank"`
	Recid       string         `json:"recid"`
	RecurType   int            `json:"recurType"`
	Sites       []string       `json:"sites"`
	StartDate   string         `json:"startDate"`
	Title       string         `json:"title"`
	TypeName    string         `json:"typeName"`
	Loc         Location       `json:"loc"`
	URL         string         `json:"url"`
	LocaleCode  string         `json:"locale_code"`
	UdfsObject  map[string]Udf `json:"udfs_object"`
}

// Category represents a category associated with an event.
type Category struct {
	CatName string `json:"catName"`
	CatID   string `json:"catId"`
}

// Media represents the media details for an event.
type Media struct {
	MediaURL string `json:"mediaurl"`
}

// Location represents the geographical location of the event.
type Location struct {
	Type        string    `json:"type"`
	Coordinates []float64 `json:"coordinates"`
}

// Udf represents user-defined fields as a map with string keys and Udf values.
type Udf struct {
	Value string `json:"value"`
}
