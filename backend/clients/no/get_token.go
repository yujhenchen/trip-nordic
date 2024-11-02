package no

import (
	"fmt"
	"io"
	"net/http"
	"regexp"
)

func GetToken(url string) (string, error) {
	res, err := http.Get(url)
	if err != nil {
		return "", err
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		return "", err
	}

	re := regexp.MustCompile(`"token":"([a-zA-Z0-9]+)"`)
	matches := re.FindStringSubmatch(string(body))

	if len(matches) < 2 {
		return "", fmt.Errorf("token not found")
	}

	return matches[1], nil
}
