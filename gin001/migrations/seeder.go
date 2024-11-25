package migrations

import (
	"github.com/ruhyadi/multimetics/gin001/config"
	"github.com/ruhyadi/multimetics/gin001/models"
)

func Seed() {
	users := []models.User{
		{Username: "user1", Password: "password1"},
		{Username: "user2", Password: "password2"},
	}

	for _, user := range users {
		config.DB.Create(&user)
	}
}
