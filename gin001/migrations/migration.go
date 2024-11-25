package migrations

import (
	"github.com/ruhyadi/multimetics/gin001/config"
	"github.com/ruhyadi/multimetics/gin001/models"
)

func Migrate() {
	config.DB.AutoMigrate(&models.User{})
}
