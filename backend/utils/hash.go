package utils

import (
	"bytes"
	"crypto/sha256"
	"encoding/gob"
	"encoding/hex"
)

func getEncode(obj interface{}) (bytes.Buffer, error) {
	// Initialize the encoder and decoder. Normally enc and dec would be
	// bound to buf and the encoder and decoder would
	// run in different processes.
	// TODO: what is bytes.Buffer how does it work
	var buf bytes.Buffer
	enc := gob.NewEncoder(&buf)
	err := enc.Encode(obj)
	if err != nil {
		return bytes.Buffer{}, err
	}
	return buf, nil
}

func GenerateHash(obj interface{}) (string, error) {
	buf, err := getEncode(obj)
	if err != nil {
		return "", err
	}
	hash := sha256.New()
	hash.Write(buf.Bytes())
	finalHash := hex.EncodeToString(hash.Sum(nil))
	return finalHash, nil
}
