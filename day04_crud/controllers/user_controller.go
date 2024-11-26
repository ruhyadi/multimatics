package controllers

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

var db *sql.DB

func InitDB(database *sql.DB) {
	db = database
}

// Register handles the user registration process.
// @Summary Register a new user
// @Description This endpoint registers a new user by accepting their name, username, password, and photo.
// @Tags users
// @Accept multipart/form-data
// @Produce application/json
// @Param name formData string true "Name of the user"
// @Param username formData string true "Username of the user"
// @Param password formData string true "Password of the user"
// @Param photo formData file true "Photo of the user"
// @Router /register [post]
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

// ListUser godoc
// @Summary List all users
// @Description Get a list of all users from the database
// @Tags users
// @Produce json
// @Router /users [get]
func ListUser(c *gin.Context) {
	rows, err := db.Query("SELECT id, name, username, photo FROM users")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengambil data user"})
		return
	}
	defer rows.Close()

	var users []map[string]interface{}
	for rows.Next() {
		var id int
		var name, username, photo string
		err = rows.Scan(&id, &name, &username, &photo)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal membaca data user"})
			return
		}

		user := map[string]interface{}{
			"id":       id,
			"name":     name,
			"username": username,
			"photo":    photo,
		}
		users = append(users, user)
	}

	c.JSON(http.StatusOK, gin.H{"results": users})
}
