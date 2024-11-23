package utils

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
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
