package controllers

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

var db *sql.DB

func Register(c *gin.Context) {
	name := c.PostForm("name")
	username := c.PostForm("username")
	password := c.PostForm("password")

	// get the photo
	file, err := c.FormFile("photo")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gagal membaca file foto"})
		return
	}

	// validation
	if name == "" || username == "" || password == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Semua form harus diisi"})
		return
	}

	// save the photo into file
	photoPath := "./uploads/" + file.Filename
	if err := c.SaveUploadedFile(file, photoPath); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gagal menyimpan file foto"})
		return
	}

	// password hashing
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengenkripsi password"})
		return
	}

	// save user to database
	_, err = db.Exec("INSERT INTO users (name, username, password, photo) VALUES (?, ?, ?, ?)",
		name, username, string(hashedPassword), photoPath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menyimpan user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Berhasil mendaftar"})
}
