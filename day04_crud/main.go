package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/ruhyadi/multimatics/day04_crud/auth"
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

// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization

func main() {
	log.Println("Simple CRUD API with GIN")
	db.InitDB()
	controllers.InitDB(db.DB)

	r := gin.Default()

	// route upload folder
	r.Static("/uploads", "./uploads")
	r.StaticFile("/swagger-custom.js", "./swagger-custom.js")

	// route
	r.POST("/login", controllers.Login)
	r.POST("/register", controllers.Register)
	// r.GET("/users", controllers.ListUser)
	// r.GET("/users/:id", controllers.DetailUser)
	// r.DELETE("/users/:id", controllers.DeleteUser)
	// r.PATCH("/users/:id", controllers.UpdateUser)

	// swagger route
	r.GET(
		"/swagger/*any", 
		ginSwagger.WrapHandler(swaggerFiles.Handler, ginSwagger.URL("/swagger/doc.json"), 
		// ginSwagger.CustomWrapHandler("/swagger-custom.js")),
		ginSwagger.CustomWrapHandler()
	)

	// protected routes
	protected := r.Group("/protected")
	protected.Use(auth.AuthMiddleware())
	protected.GET("/welcome", func(c *gin.Context) {
		username, _ := c.Get("username")
		c.JSON(http.StatusOK, gin.H{"message": "Welcome " + username.(string)})
	})
	protected.GET("/users", controllers.ListUser)
	protected.GET("/users/:id", controllers.DetailUser)
	protected.DELETE("/users/:id", controllers.DeleteUser)
	protected.PATCH("/users/:id", controllers.UpdateUser)

	r.Run(":8081")
}
