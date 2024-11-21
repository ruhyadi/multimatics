package db

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

func NewPgSQLStorage(username, password, host, port, dbname string) (*sql.DB, error) {
	connStr := "user=" + username + " password=" + password + " host=" + host + " port=" + port + " dbname=" + dbname + " sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, err
	}

	// verify connection
	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("failed to ping database: %v", err)
	}

	log.Println("Successfully connected to database")

	return db, nil
}
