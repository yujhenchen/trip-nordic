package fi

type Result struct {
	// Name       string `json:"@name"`
	// Path       string `json:"@path"`
	ID string `json:"@id"`
	// NodeType   string `json:"@nodeType"`
	// CreatedBy  string `json:"jcr:createdBy"`
	IDInternal string `json:"id"`
	Languages  string `json:"languages"`
	NameField  string `json:"name"`
	NameEN     string `json:"nameEN"`
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
