package db

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func InitDB() {
	username := "didi"
	password := "didi12345"
	host := "multimatics-mysql"
	port := "3306"
	database := "multimatics"

	var err error
	DB, err = sql.Open("mysql", username+":"+password+"@tcp("+host+":"+port+")/"+database)
	if err != nil {
		log.Fatalf("Error connecting to database: %s", err)
	}

	// testing connection
	err = DB.Ping()
	if err != nil {
		log.Fatalf("Error pinging to database: %s", err)
	}

	log.Println("Connected to database")
}
