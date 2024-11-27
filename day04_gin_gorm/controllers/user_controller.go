package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/ruhyadi/multimatics/day04_gin_gorm/config"
	"github.com/ruhyadi/multimatics/day04_gin_gorm/models"
)

func RegisterUser(c *gin.Context) {
	var input models.User
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&input)
	c.JSON(http.StatusOK, gin.H{"data": input})
}
