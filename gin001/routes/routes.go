package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/ruhyadi/multimetics/gin001/controllers"
)

func SetupRoutes(r *gin.Engine) {
	r.POST("/register", controllers.RegisterUser)
}
