package utils

import "strings"

// SplitAndTrim splits a comma-separated string and trims whitespace from each part.
// If the input is empty, it returns nil.
func SplitAndTrim(s string) []string {
	if s == "" {
		return nil
	}
	parts := strings.Split(s, ",")
	for i := range parts {
		parts[i] = strings.TrimSpace(parts[i])
	}
	return parts
}
