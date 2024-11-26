package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/ruhyadi/multimatics/day04_crud/controllers"
	"github.com/ruhyadi/multimatics/day04_crud/db"
	_ "github.com/ruhyadi/multimatics/day04_crud/docs"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title Simple CRUD API
// @version 1.0
// @description This is a simple CRUD API with Gin, JWT, and MySQL.
// @termsOfService http://swagger.io/terms/

// @contact.name API Support
// @contact.url http://www.swagger.io/support
// @contact.email support@swagger.io

// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @host localhost:8081
// @BasePath /

func main() {
	log.Println("Simple CRUD API with GIN")
	db.InitDB()
	controllers.InitDB(db.DB)

	r := gin.Default()

	// route upload folder
	r.Static("/uploads", "./uploads")

	// route
	r.POST("/register", controllers.Register)
	r.GET("/users", controllers.ListUser)
	r.GET("/users/:id", controllers.DetailUser)
	r.DELETE("/users/:id", controllers.DeleteUser)

	// swagger route
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	r.Run(":8081")
}
