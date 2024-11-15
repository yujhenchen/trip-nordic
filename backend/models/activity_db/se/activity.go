package activity_db

import "encoding/json"

type Result struct {
	ID            int             `json:"id"`
	Title         string          `json:"title"`
	Href          string          `json:"href"`
	Text          string          `json:"text"`
	OriginalTitle string          `json:"original_title"` // NOTE: alternative if Title does not exist
	Categories    json.RawMessage `json:"categories"`     // FIX ME: this is either []string or string
}
