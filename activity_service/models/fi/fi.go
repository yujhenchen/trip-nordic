package fi

// type Image struct {
//     Copyright    string `json:"copyright"`
//     Filename     string `json:"filename"`
//     AltText      string `json:"altText"`
//     LargeURL     string `json:"largeUrl"`
//     OriginalURL  string `json:"originalUrl"`
//     ThumbnailURL string `json:"thumbnailUrl"`
//     CoverPhoto   bool   `json:"coverPhoto"`
//     Orientation  string `json:"orientation"`
// }

type Result struct {
	// Name       string `json:"@name"`
	// Path       string `json:"@path"`
	ID string `json:"@id"`
	// NodeType   string `json:"@nodeType"`
	// CreatedBy  string `json:"jcr:createdBy"`
	IDInternal string `json:"id"`
	Languages  string `json:"languages"`
	// NameField  string `json:"name"`
	NameEN string `json:"nameEN"`
	// NameFI           string `json:"nameFI,omitempty"`
	// NameSV           string `json:"nameSV,omitempty"`
	// NameDE           string `json:"nameDE,omitempty"`
	Seasons       string `json:"seasons"`
	DescriptionEN string `json:"descriptionEN,omitempty"`
	// DescriptionFI    string `json:"descriptionFI,omitempty"`
	// DescriptionSV    string `json:"descriptionSV,omitempty"`
	// DescriptionDE    string `json:"descriptionDE,omitempty"`
	// LastActivated    string `json:"mgnl:lastActivated"`
	// Created          string `json:"mgnl:created"`
	Region string `json:"region"`
	// ActivationStatus bool   `json:"mgnl:activationStatus"`
	// Sustainable    string `json:"sustainable"`
	// Slug           string `json:"slug"`
	Category   string `json:"category"`
	Accessible string `json:"accessible"`
	City       string `json:"city"`
	// LastModified   string `json:"mgnl:lastModified"`
	// LastModifiedBy string `json:"mgnl:lastModifiedBy"`
	// Image            Image  `json:"image"`
}

type MappedResult struct {
	ID            string   `json:"id"`
	Name          string   `json:"name"`
	Description   string   `json:"description,omitempty"`
	Region        string   `json:"region"`
	City          string   `json:"city"`
	Categories    []string `json:"categories,omitempty"`
	Seasons       []string `json:"seasons,omitempty"`
	CategoriesStr string   `json:"categories_str,omitempty"`
	SeasonsStr    string   `json:"seasons_str,omitempty"`
}

type Response struct {
	Total   int      `json:"total"`
	Offset  int      `json:"offset"`
	Limit   int      `json:"limit"`
	Results []Result `json:"results"`
}
