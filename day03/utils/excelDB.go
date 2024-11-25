package utils

import (
	"fmt"
	"log"
	"os"
	"sync"
	"time"

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

func BacaDB() error {
	t0 := time.Now()

	db, _ := db.ConnectMySQL()
	rows, err := db.Query("SELECT ID, INITIATOR_REF_NO, SYS_REF_NO, AMOUNT FROM fortraining")
	if err != nil {
		log.Fatalf("Error querying database: %s", err)
	}
	defer rows.Close()

	// create a new excel file
	file := xlsx.NewFile()
	sheet, err := file.AddSheet("Sheet1")
	if err != nil {
		return fmt.Errorf("error creating new sheet: %s", err)
	}

	// create excel header
	header := sheet.AddRow()
	header.AddCell().Value = "ID"
	header.AddCell().Value = "INITIATOR_REF_NO"
	header.AddCell().Value = "SYS_REF_NO"
	header.AddCell().Value = "AMOUNT"

	// loop through the rows
	for rows.Next() {
		var id, initiatorRefNo, sysRefNo, amount string

		err := rows.Scan(&id, &initiatorRefNo, &sysRefNo, &amount)
		if err != nil {
			return fmt.Errorf("error scanning rows: %s", err)
		}

		row := sheet.AddRow()
		row.AddCell().Value = id
		row.AddCell().Value = initiatorRefNo
		row.AddCell().Value = sysRefNo
		row.AddCell().Value = amount
	}

	err = file.Save("../tmp/forTrainingFromDB.xlsx")
	if err != nil {
		return fmt.Errorf("error saving file: %s", err)
	}

	log.Println("Data has been written to excel file")

	t1 := time.Now()
	log.Printf("The query took %v to run\n", t1.Sub(t0))

	return nil
}

func Csv() error {
	t0 := time.Now()
	db, _ := db.ConnectMySQL()
	rows, err := db.Query("SELECT ID, INITIATOR_REF_NO, SYS_REF_NO, AMOUNT FROM fortraining")
	if err != nil {
		log.Fatalf("Error querying database: %s", err)
	}
	defer rows.Close()

	file, err := os.Create("../tmp/forTrainingFromDB.csv")
	if err != nil {
		return fmt.Errorf("error creating file: %s", err)
	}
	defer file.Close()

	// write header
	_, err = file.WriteString("ID,INITIATOR_REF_NO,SYS_REF_NO,AMOUNT\n")
	if err != nil {
		return fmt.Errorf("error writing header: %s", err)
	}

	// loop through the rows
	for rows.Next() {
		var id, initiatorRefNo, sysRefNo, amount string

		err := rows.Scan(&id, &initiatorRefNo, &sysRefNo, &amount)
		if err != nil {
			return fmt.Errorf("error scanning rows: %s", err)
		}

		_, err = file.WriteString(fmt.Sprintf("%s,%s,%s,%s\n", id, initiatorRefNo, sysRefNo, amount))
		if err != nil {
			return fmt.Errorf("error writing rows: %s", err)
		}
	}

	err = file.Sync()
	if err != nil {
		return fmt.Errorf("error syncing file: %s", err)
	}

	log.Println("Data has been written to csv file")
	t1 := time.Now()

	log.Printf("The query took %v to run\n", t1.Sub(t0))

	return nil
}
