package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	DB DBConfig
}

type DBConfig struct {
	Username string
	Password string
	Host     string
	Port     string
	DBName   string
}

var Envs = initConfig()

func initConfig() *Config {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	return &Config{
		DB: DBConfig{
			Username: getEnv("DB_USERNAME", "didi"),
			Password: getEnv("DB_PASSWORD", "didi123"),
			Host:     getEnv("DB_HOST", "multimatics-postgres"),
			Port:     getEnv("DB_PORT", "4780"),
			DBName:   getEnv("DB_NAME", "multimatics"),
		},
	}
}

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}

	return fallback
}
