package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/ruhyadi/multimatics/day04_gin_gorm/controllers"
)

func SetupRoutes(r *gin.Engine) {
	r.POST("/register", controllers.RegisterUser)
}
