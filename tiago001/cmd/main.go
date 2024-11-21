package main

import (
	"log"

	"github.com/ruhyadi/multimatics/cmd/api"
	"github.com/ruhyadi/multimatics/config"
	"github.com/ruhyadi/multimatics/db"
)

func main() {
	db, err := db.NewPgSQLStorage(
		config.Envs.DB.Username,
		config.Envs.DB.Password,
		config.Envs.DB.Host,
		config.Envs.DB.Port,
		config.Envs.DB.DBName,
	)
	if err != nil {
		log.Fatal(err)
	}

	server := api.NewAPIServer(":8080", db)
	if err := server.Run(); err != nil {
		log.Fatal(err)
	}
}
