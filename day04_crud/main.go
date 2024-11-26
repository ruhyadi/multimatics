package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/ruhyadi/multimatics/day04_crud/controllers"
	"github.com/ruhyadi/multimatics/day04_crud/db"
)

func main() {
	log.Println("Simple CRUD API with GIN")
	db.InitDB()

	r := gin.Default()

	// route upload folder
	r.Static("/uploads", "./uploads")

	// route
	r.POST("/register", controllers.Register)

	r.Run(":8080")
}
