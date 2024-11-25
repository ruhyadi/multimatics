package main

import (
	"log"

	"github.com/joho/godotenv"
	"github.com/ruhyadi/multimetics/gin001/config"
	"github.com/ruhyadi/multimetics/gin001/migrations"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	config.ConnectDatabase()
	migrations.Seed()
	log.Println("Database seeded successfully")
}
