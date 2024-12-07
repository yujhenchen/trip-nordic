package config

import (
	"os"

	"github.com/joho/godotenv"
)

func LoadEnvFile() error {
	err := godotenv.Load()
	if err != nil {
		return err
	}
	return nil
}

func GoDotEnvVariable(key string) string {
	// rootDir, err := filepath.Abs(".")
	// if err != nil {
	// 	log.Fatalf("Failed to determine root directory: %v", err)
	// }

	// Construct the path to the .env file
	// envPath := filepath.Join(rootDir, ".env")

	// err := godotenv.Load()
	// if err != nil {
	// 	return "" //, fmt.Errorf("failed to load .env file")
	// }
	return os.Getenv(key)
}
