package se

import "backend/models/activity/api/se"

type Result struct {
	ID            int
	Title         string
	Href          string
	Text          string
	OriginalTitle string
	Categories    se.Categories
	Hash          string
}
