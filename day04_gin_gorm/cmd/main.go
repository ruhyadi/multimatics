package main

import (
	"github.com/gin-gonic/gin"
	"github.com/ruhyadi/multimatics/day04_gin_gorm/config"
	_ "github.com/ruhyadi/multimatics/day04_gin_gorm/docs"
	"github.com/ruhyadi/multimatics/day04_gin_gorm/migrations"
	"github.com/ruhyadi/multimatics/day04_gin_gorm/routes"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func main() {
	r := gin.Default()

	// connect to database
	config.ConnectDatabase()
	migrations.Migrate()

	// setup routes
	routes.SetupRoutes(r)

	r.GET(
		"/swagger/*any",
		ginSwagger.WrapHandler(swaggerFiles.Handler, ginSwagger.URL("/swagger/doc.json")),
	)

	// run the server
	r.Run()
}
