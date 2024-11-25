package main

import (
	"log"

	"github.com/ruhyadi/multimatics/utils"
	"github.com/ruhyadi/multimatics/utils/nested"
)

func main() {
	log.Println("Day 003")

	utils.BilangHallo()
	nested.NestedHello()

	// utils.JalanAntrian()
	// utils.JalanAntrianWG()
	// utils.JalanAntrianChannel()
	// utils.JalanAntrianGabungan()
	// utils.ChannelExample001()
	// utils.Baca()

	// total, rerata := utils.Anon(1, 2, 3, 4, 5)
	// log.Println("Total:", total)
	// log.Println("Rerata:", rerata)

	// db, err := db.ConnectMySQL()
	// if err != nil {
	// 	log.Fatalf("Error connecting to database: %s", err)
	// }

	// // SELECT * FROM fortraining
	// rows, err := db.Query("SELECT * FROM fortraining")
	// if err != nil {
	// 	log.Fatalf("Error querying database: %s", err)
	// }
	// // print the result
	// for rows.Next() {
	// 	var id_for_training int
	// 	var id string
	// 	var initiatorRefNo string
	// 	var sysRefNo string
	// 	var amount int

	// 	err = rows.Scan(&id_for_training, &id, &initiatorRefNo, &sysRefNo, &amount)
	// 	if err != nil {
	// 		log.Fatalf("Error scanning rows: %s", err)
	// 	}
	// 	fmt.Println(id_for_training, id, initiatorRefNo, sysRefNo, amount)
	// }

	// insert data to db
	// utils.TulisDB()
	// utils.BacaDB()
	utils.Csv()
}
