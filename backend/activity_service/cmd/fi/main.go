package main

import (
	"backend/config"
	"backend/models/api/fi"
	"backend/scripts"
	"fmt"
	"log"
)

func getFIData(limit int) (*[]fi.Result, error) {
	if limit < 1 {
		return nil, fmt.Errorf("limit need to be at least 1")
	}
	language := "en"
	res, err := scripts.GetFIAPIData(limit, language)
	if err != nil {
		return nil, err
	}
	return &res.Results, nil
}

func main() {
	config.LoadEnvFile()

	data, err := getFIData(5)
	if err != nil {
		log.Fatalf("Error getFIData error: %v", err)
	}
	fmt.Println((*data)[0].NameField)

}
