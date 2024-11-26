package controllers

import (
	"database/sql"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/ruhyadi/multimatics/day04_crud/auth"
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

// DetailUser godoc
// @Summary Get user details
// @Description Get details of a user by ID
// @Tags users
// @Accept json
// @Produce json
// @Param id path string true "User ID"
// @Router /users/{id} [get]
func DetailUser(c *gin.Context) {
	id := c.Param("id")

	var name, username, photo string
	err := db.QueryRow("SELECT name, username, photo FROM users WHERE id = ?", id).Scan(&name, &username, &photo)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengambil data user"})
		return
	}

	user := map[string]interface{}{
		"id":       id,
		"name":     name,
		"username": username,
		"photo":    photo,
	}

	c.JSON(http.StatusOK, gin.H{"result": user})
}

// DeleteUser handles the deletion of a user by their ID.
//
// @Summary Delete a user
// @Description Delete a user by their ID, including their photo file if it exists
// @Tags users
// @Accept json
// @Produce json
// @Param id path string true "User ID"
// @Router /users/{id} [delete]
func DeleteUser(c *gin.Context) {
	id := c.Param("id")

	// delete the photo file
	var photo string
	err := db.QueryRow("SELECT photo FROM users WHERE id = ?", id).Scan(&photo)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengambil data user"})
		return
	}

	if photo != "" {
		err = os.Remove(photo)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menghapus file foto"})
			return
		}
	}

	// remove user from database
	_, err = db.Exec("DELETE FROM users WHERE id = ?", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menghapus user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Berhasil menghapus user"})

}

// UpdateUser godoc
// @Summary Update a user's information
// @Description Update a user's name and optionally their photo
// @Tags users
// @Accept multipart/form-data
// @Produce json
// @Param id path string true "User ID"
// @Param name formData string true "User Name"
// @Param photo formData file false "User Photo"
// @Router /users/{id} [patch]
func UpdateUser(c *gin.Context) {
	id := c.Param("id")

	// get the name
	name := c.PostForm("name")
	if name == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Name is required"})
		return
	}

	// check if user exist
	var existingPhoto string
	err := db.QueryRow("SELECT photo FROM users WHERE id = ?", id).Scan(&existingPhoto)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user data"})
		return
	}

	// upload new photo
	file, err := c.FormFile("photo")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gagal membaca file foto"})
		return
	}
	newPhotoFilename := "./uploads/" + file.Filename
	if err := c.SaveUploadedFile(file, newPhotoFilename); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menyimpan file foto"})
		return
	}

	// update user data
	if newPhotoFilename != "" {
		_, err = db.Exec("UPDATE users SET name = ?, photo = ? WHERE id = ?", name, newPhotoFilename, id)
	} else {
		_, err = db.Exec("UPDATE users SET name = ? WHERE id = ?", name, id)
	}
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user data"})
		return
	}

	// remove existing photo
	if existingPhoto != "" {
		err = os.Remove(existingPhoto)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to remove existing photo"})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"message": "User data updated"})
}

// Login handles user login requests.
// @Summary User login
// @Description Authenticates a user and returns a JWT token if successful.
// @Tags users
// @Accept application/x-www-form-urlencoded
// @Produce application/json
// @Param username formData string true "Username"
// @Param password formData string true "Password"
// @Router /login [post]
func Login(c *gin.Context) {
	username := c.PostForm("username")
	password := c.PostForm("password")

	// simple validation
	if username == "" || password == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Username and password are required"})
		return
	}

	// check user in database
	var hashedPassword string
	err := db.QueryRow("SELECT password FROM users WHERE username = ?", username).Scan(&hashedPassword)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username"})
		return
	}

	// password verification
	if err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid password"})
		return
	}

	// generate token
	token, err := auth.GenerateToken(username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": token})
}
