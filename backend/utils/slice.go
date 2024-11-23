package utils

import (
	"fmt"
	"reflect"
)

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
