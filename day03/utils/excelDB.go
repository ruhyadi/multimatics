package utils

import (
	"log"
	"sync"

	"github.com/ruhyadi/multimatics/db"
	"github.com/tealeg/xlsx"
)

func TulisDB() {
	var wg sync.WaitGroup

	type RowData struct {
		Index int
		Row   *xlsx.Row
	}
	rowsChannel := make(chan RowData)

	filePath := "../assets/forTraining.xlsx"
	xlFile, err := xlsx.OpenFile(filePath)
	if err != nil {
		log.Fatalf("Error opening file: %s", err)
	}

	sheet := xlFile.Sheets[0]

	// connect to db
	db, _ := db.ConnectMySQL()

	wg.Add(1)
	go func() {
		defer wg.Done()
		for i, row := range sheet.Rows {
			if i == 0 {
				continue
			}
			rowsChannel <- RowData{Index: i, Row: row}
		}
		close(rowsChannel)
	}()

	wg.Add(1)
	go func() {
		defer wg.Done()
		defer db.Close()
		for rowData := range rowsChannel {
			id := rowData.Row.Cells[1].String()
			initiatorRefNo := rowData.Row.Cells[3].String()
			sysRefNo := rowData.Row.Cells[4].String()
			amount := rowData.Row.Cells[12].String()

			insertQuery := "INSERT INTO fortraining (ID, INITIATOR_REF_NO, SYS_REF_NO, amount) VALUES (?, ?, ?, ?)"
			_, err := db.Exec(insertQuery, id, initiatorRefNo, sysRefNo, amount)
			if err != nil {
				log.Fatalf("Error inserting data: %s", err)
			}
		}
	}()

	wg.Wait()

	log.Println("Data has been written to database")
}
