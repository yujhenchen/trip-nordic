package activity_db

import activity_api "backend/models/activity_api/se"

type Result struct {
	ID            int                     `json:"id"`
	Title         string                  `json:"title"`
	Href          string                  `json:"href"`
	Text          string                  `json:"text"`
	OriginalTitle string                  `json:"original_title"` // NOTE: alternative if Title does not exist
	Categories    activity_api.Categories `json:"categories"`     // FIX ME: this is either []string or string
}
