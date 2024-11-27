package main

import (
	"github.com/gin-gonic/gin"
	"github.com/ruhyadi/multimatics/day04_gin_gorm/config"
	"github.com/ruhyadi/multimatics/day04_gin_gorm/migrations"
	"github.com/ruhyadi/multimatics/day04_gin_gorm/routes"
)

func main() {
	r := gin.Default()

	// connect to database
	config.ConnectDatabase()
	migrations.Migrate()

	// setup routes
	routes.SetupRoutes(r)

	// run the server
	r.Run()
}
