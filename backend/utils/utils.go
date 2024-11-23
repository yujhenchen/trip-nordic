package utils

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"reflect"
)

func GenerateHash(obj interface{}) (string, error) {
	jsonData, err := json.Marshal(obj)
	if err != nil {
		fmt.Printf("Error marshaling object: %v", err)
		return "", err
	}

	hash := sha256.New()
	hash.Write(jsonData)
	finalHash := hex.EncodeToString(hash.Sum(nil))
	return finalHash, nil
}

func StructsToInterfaceSlice[T any](slice []T) ([]interface{}, error) {
	if len(slice) == 0 {
		return nil, fmt.Errorf("error slice len is 0")
	}
	if reflect.ValueOf(slice[0]).Kind() != reflect.Struct {
		return nil, fmt.Errorf("error slice is not a slice of Struct")
	}
	var interfaceSlice []interface{}

	for idx := range slice {
		interfaceSlice = append(interfaceSlice, slice[idx])
	}
	return interfaceSlice, nil
}
