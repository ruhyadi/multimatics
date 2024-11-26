package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	_ "github.com/ruhyadi/multimatics/day04/docs"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"github.com/tealeg/xlsx"
)

var db *sql.DB

// @title Gin Swagger Example API
// @version 1.0
// @description This is a sample server for a Gin application.
// @termsOfService http://swagger.io/terms/

// @contact.name API Support
// @contact.url http://www.swagger.io/support
// @contact.email support@swagger.io

// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @host localhost:8080
// @BasePath /

func main() {
	r := gin.Default()
	r.Static("/assets", "../tmp")

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Disposition"},
		AllowCredentials: true,
	}))
	ConnectMySQL()

	// swagger route
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// route
	r.POST("/upload", UploadFile)
	r.GET("/export", ExportData)

	r.Run(":8080")
}

type Transaction struct {
	ID               string
	INITIATOR_REF_NO string
	SYS_REF_NO       string
	HOST_TRX_DT      time.Time
}

func ConnectMySQL() {
	username := "didi"
	password := "didi12345"
	host := "multimatics-mysql"
	port := "3306"
	database := "multimatics"

	var err error
	db, err = sql.Open("mysql", username+":"+password+"@tcp("+host+":"+port+")/"+database)
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
}

// @Summary Upload a file
// @Description Upload a file to the server
// @Accept  multipart/form-data
// @Produce  json
// @Param   file formData file true "File to upload"
// @Success 200 {object} map[string]string
// @Failure 400 {object} map[string]string
// @Router /upload [post]
func UploadFile(c *gin.Context) {
	file, err := c.FormFile("file")
	if err != nil {
		c.String(http.StatusBadRequest, "Bad request: %s", err)
		return
	}

	// save the uploaded file
	if err := c.SaveUploadedFile(file, "../assets/forTraining.xlsx"); err != nil {
		c.String(http.StatusInternalServerError, "Could not save the file: %s", err)
	}

	// process file async
	var wg sync.WaitGroup
	ch := make(chan Transaction)

	// goroutine to insert into the database
	wg.Add(1)
	go func() {
		defer wg.Done()
		for transaction := range ch {
			_, err := db.Exec("INSERT INTO transactions (ID, INITIATOR_REF_NO, SYS_REF_NO, HOST_TRX_DT) VALUES (?, ?, ?, ?)", transaction.ID, transaction.INITIATOR_REF_NO, transaction.SYS_REF_NO, transaction.HOST_TRX_DT)
			if err != nil {
				log.Println("Error inserting record: ", err)
			}
		}
	}()

	// read xlsx file in a separate goroutine
	go func() {
		xlFile, err := xlsx.OpenFile("../assets/forTraining.xlsx")
		if err != nil {
			log.Fatal("Failed to open file: ", err)
		}

		for _, sheet := range xlFile.Sheets {
			for _, row := range sheet.Rows {
				id := row.Cells[1].String()
				initiatorRefNo := row.Cells[3].String()
				sysRefNo := row.Cells[4].String()
				hostTrxDt := row.Cells[11].String()
				hostTrxDtTime, err := time.Parse("2006-01-02 15:04:05", hostTrxDt)
				if err != nil {
					log.Println("Error parsing date: ", err)
				}

				transaction := Transaction{
					ID:               id,
					INITIATOR_REF_NO: initiatorRefNo,
					SYS_REF_NO:       sysRefNo,
					HOST_TRX_DT:      hostTrxDtTime,
				}
				ch <- transaction
			}
		}
		close(ch)
	}()

	wg.Wait()
	c.String(http.StatusOK, "File uploaded successfully")
}

// ExportData handles the export of transaction data to both an XLSX file and a TXT file.
// @Summary Export transaction data
// @Description Export transaction data to XLSX and TXT files
// @Tags transactions
// @Produce plain
// @Success 200 {string} string "Data exported successfully"
// @Failure 500 {string} string "Error querying database" or "Error scanning rows" or "Error saving file" or "Error creating file"
// @Router /export [get]
func ExportData(c *gin.Context) {
	rows, err := db.Query("SELECT ID, INITIATOR_REF_NO, SYS_REF_NO, HOST_TRX_DT FROM transactions")
	if err != nil {
		c.String(http.StatusInternalServerError, "Error querying database: %s", err)
		return
	}
	defer rows.Close()

	var transactions []Transaction
	for rows.Next() {
		var t Transaction
		var hostTrxDt []byte

		err := rows.Scan(&t.ID, &t.INITIATOR_REF_NO, &t.SYS_REF_NO, &hostTrxDt)
		if err != nil {
			c.String(http.StatusInternalServerError, "Error scanning rows: %s", err)
			return
		}

		t.HOST_TRX_DT, err = time.Parse("2006-01-02 15:04:05", string(hostTrxDt))
		if err != nil {
			log.Println("Error parsing date: ", err)
		}

		transactions = append(transactions, t)
	}

	// write to xlsx file
	var wg sync.WaitGroup
	wg.Add(2)

	// goroutine to write to xlsx file
	go func() {
		defer wg.Done()
		file := xlsx.NewFile()
		sheet, _ := file.AddSheet("Sheet1")

		// create header
		header := sheet.AddRow()
		headerCells := []string{"ID", "INITIATOR_REF_NO", "SYS_REF_NO", "HOST_TRX_DT"}
		style := xlsx.NewStyle()
		style.Font.Bold = true
		style.Alignment.Horizontal = "center"

		for _, h := range headerCells {
			cell := header.AddCell()
			cell.Value = h
			cell.SetStyle(style)
		}

		// add data rows
		for _, t := range transactions {
			row := sheet.AddRow()
			row.AddCell().SetString(t.ID)
			row.AddCell().SetString(t.INITIATOR_REF_NO)
			row.AddCell().SetString(t.SYS_REF_NO)
			row.AddCell().SetString(t.HOST_TRX_DT.Format("2006-01-02 15:04:05"))
		}
		err := file.Save("../tmp/transactions.xlsx")
		if err != nil {
			log.Fatal("Error saving file: ", err)
		}
	}()

	// goroutine to write to txt
	go func() {
		defer wg.Done()
		file, err := os.Create("../tmp/transactions.txt")
		if err != nil {
			log.Fatal("Error creating file: ", err)
		}
		defer file.Close()

		// add header
		file.WriteString("ID,INITIATOR_REF_NO,SYS_REF_NO,HOST_TRX_DT\n")

		// add data rows
		for _, t := range transactions {
			file.WriteString(t.ID + "," + t.INITIATOR_REF_NO + "," + t.SYS_REF_NO + "," + t.HOST_TRX_DT.Format("2006-01-02 15:04:05") + "\n")
		}
	}()

	wg.Wait()
	c.String(http.StatusOK, "Data exported successfully")
}
