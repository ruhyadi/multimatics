package main

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/ruhyadi/multimetics/gin001/config"
	"github.com/ruhyadi/multimetics/gin001/models"
	"github.com/ruhyadi/multimetics/gin001/routes"
	"github.com/stretchr/testify/assert"
)

func TestRegisterUser(t *testing.T) {
	// Set up the Gin router
	router := gin.Default()
	config.ConnectDatabase()
	routes.SetupRoutes(router)

	// Create a new user payload
	user := models.User{
		Username: "testuser",
		Password: "password",
	}
	jsonValue, _ := json.Marshal(user)

	// Create a new HTTP request
	req, _ := http.NewRequest("POST", "/register", bytes.NewBuffer(jsonValue))
	req.Header.Set("Content-Type", "application/json")

	// Record the response
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	// Assert the response
	assert.Equal(t, http.StatusOK, w.Code)
	var response map[string]interface{}
	json.Unmarshal(w.Body.Bytes(), &response)
	assert.Equal(t, "testuser", response["data"].(map[string]interface{})["username"])
}

func TestMain(m *testing.M) {
	// Load environment variables
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	// Run tests
	m.Run()
}
