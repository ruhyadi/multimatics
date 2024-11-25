package main

import (
	"github.com/gin-gonic/gin"
	"github.com/ruhyadi/multimetics/gin001/config"
	"github.com/ruhyadi/multimetics/gin001/migrations"
	"github.com/ruhyadi/multimetics/gin001/routes"
)

func main() {
	r := gin.Default()
	config.ConnectDatabase()
	migrations.Migrate()
	routes.SetupRoutes(r)
	r.Run()
}
