package migrations

import (
	"github.com/ruhyadi/multimatics/day04_gin_gorm/config"
	"github.com/ruhyadi/multimatics/day04_gin_gorm/models"
)

func Migrate() {
	config.DB.AutoMigrate(&models.User{})
}
