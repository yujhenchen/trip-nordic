package config

import (
	"os"

	"github.com/joho/godotenv"
)

func GoDotEnvVariable(key string) string {
	err := godotenv.Load()

	if err != nil {
		return "" //, fmt.Errorf("failed to load .env file")
	}
	return os.Getenv(key)
}
