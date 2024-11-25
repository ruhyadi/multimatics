package utils

import (
	"fmt"
	"log"
	"strconv"
	"sync"
	"time"

	"github.com/tealeg/xlsx"
)

func Baca() {
	var wg sync.WaitGroup
	var waktuMulai = time.Now()
	counter := 0
	totalAmount := 0

	type RawData struct {
		Index int
		Row   *xlsx.Row
	}
	rowsChannel := make(chan RawData)

	filePath := "../assets/forTraining.xlsx"
	xlFile, err := xlsx.OpenFile(filePath)
	if err != nil {
		log.Fatalf("Error opening file: %s", err)
	}

	sheet := xlFile.Sheets[0]

	results := make([]string, len(sheet.Rows))

	wg.Add(1)
	go func() {
		defer wg.Done()
		for i, row := range sheet.Rows {
			if i == 0 {
				continue
			}
			rowsChannel <- RawData{Index: i, Row: row}
		}
		close(rowsChannel)
	}()

	wg.Add(1)
	go func() {
		defer wg.Done()
		for rowData := range rowsChannel {
			id := rowData.Row.Cells[1].String()
			initiatorRefNo := rowData.Row.Cells[3].String()
			sysRefNo := rowData.Row.Cells[4].String()

			var amount string = "0"
			if rowData.Row.Cells[12] != nil {
				amount = rowData.Row.Cells[12].String()
			} else {
				amount = "0"
			}

			results[rowData.Index] = fmt.Sprintf("ID : %s, Initiator Ref No : %s, Sys Ref No : %s, Amount : %s", id, initiatorRefNo, sysRefNo, amount)
			convertAmount, err := strconv.Atoi(amount)
			if err != nil {
				totalAmount += convertAmount
			}
		}
	}()

	wg.Wait()

	for _, result := range results {
		fmt.Println(result)
		counter++
	}

	var WaktuSelesai = time.Since(waktuMulai)
	log.Printf("Waktu selesai: %v, Sebanyak: %d, Data: %d, Total Amount: %d", WaktuSelesai, counter, len(results), totalAmount)
}
