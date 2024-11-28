package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/ruhyadi/multimatics/day04_gin_gorm/config"
	"github.com/ruhyadi/multimatics/day04_gin_gorm/models"
)

// RegisterUser godoc
// @Summary Register a new user
// @Description Register a new user
// @Tags users
// @Accept json
// @Produce json
// @Param user body models.UserRegister true "User data"
// @Success 200 {object} models.User
// @Failure 400 {object} map[string]interface{}
// @Router /users/register [post]
func RegisterUser(c *gin.Context) {
	var input models.User
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&input)
	c.JSON(http.StatusOK, gin.H{"data": input})
}
