package db

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

func ConnectMySQL() (*sql.DB, error) {
	username := "didi"
	password := "didi12345"
	host := "multimatics-mysql"
	port := "3306"
	database := "multimatics"

	db, err := sql.Open("mysql", username+":"+password+"@tcp("+host+":"+port+")/"+database)
	if err != nil {
		log.Fatalf("Error connecting to database: %s", err)
	}

	// testing connection
	err = db.Ping()
	if err != nil {
		log.Fatalf("Error pinging to database: %s", err)
	} else {
		log.Println("Connected to database")
	}

	return db, nil
}
