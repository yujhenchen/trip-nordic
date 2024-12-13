package utils

import (
	"backend/config"
	"fmt"
	"strings"
)

func GetFormatFields(fields []string) string {
	formattedFields := make([]string, len(fields))
	for i, field := range fields {
		formattedFields[i] = fmt.Sprintf("\"%s\":1", field)
	}
	return strings.Join(formattedFields, ",")
}

func GetFIActivityParams() string {
	fields := strings.Split(config.GoDotEnvVariable("NO_ACTIVITY_FIELDS"), ",")
	params := make([]string, 0, len(fields))
	for _, field := range fields {
		var value string
		switch field {
		case "offset":
			value = config.GoDotEnvVariable("FI_ACTIVITY_OFFSET")
		case "limit":
			value = config.GoDotEnvVariable("FI_ACTIVITY_LIMIT")
		case "language":
			value = config.GoDotEnvVariable("FI_ACTIVITY_LANGUAGE")
		case "category":
			value = config.GoDotEnvVariable("FI_ACTIVITY_CATEGORY")
		}
		if value != "" {
			params = append(params, fmt.Sprintf("%s=%s", field, value))
		}
	}
	return strings.Join(params, "&")

}

func GetNOActivityParams() string {
	filterTags := config.GoDotEnvVariable("NO_ACTIVITY_FILTER_TAGS")
	calendarID := config.GoDotEnvVariable("NO_ACTIVITY_CALENDAR_ID")
	categoryIDs := strings.Split(config.GoDotEnvVariable("NO_ACTIVITY_CATEGORIES"), ",")
	startDate := config.GoDotEnvVariable("NO_ACTIVITY_EVENT_DATE_GTE")
	endDate := config.GoDotEnvVariable("NO_ACTIVITY_EVENT_DATE_LTE")
	limit := config.GoDotEnvVariable("NO_ACTIVITY_OPTIONS_LIMIT")
	skip := config.GoDotEnvVariable("NO_ACTIVITY_OPTIONS_SKIP")
	count := config.GoDotEnvVariable("NO_ACTIVITY_OPTIONS_COUNT")
	castDocs := config.GoDotEnvVariable("NO_ACTIVITY_OPTIONS_CAST_DOCS")
	fields := strings.Split(config.GoDotEnvVariable("NO_ACTIVITY_FIELDS"), ",")

	// Constructing the JSON string
	jsonStr := fmt.Sprintf(`{"filter":{"$and":[{"filter_tags":{"$in":["%s"]}},{"calendarid":{"$in":["%s"]}},{"categories.catId":{"$in":["%s"]}}],"dates":{"$elemMatch":{"eventDate":{"$gte":{"$date":"%s"},"$lte":{"$date":"%s"}}}}},"options":{"limit":%s,"skip":%s,"count":%s,"castDocs":%s,"fields":{%s}}}`,
		filterTags,
		calendarID,
		strings.Join(categoryIDs, "\",\""),
		startDate,
		endDate,
		limit,
		skip,
		count,
		castDocs,
		GetFormatFields(fields),
	)
	return jsonStr
}
