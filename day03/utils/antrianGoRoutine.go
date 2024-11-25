package utils

import (
	"log"
	"time"
)

func JalanAntrian() {
	go printMessage("Go Routine 1")
	go printMessage("Go Routine 2")

	printMessage("Not Go Routine")

	// increment with go routine
	counter := 1
	go incrementCounter(&counter)
	go incrementCounter(&counter)
	incrementCounter(&counter)

	log.Println("Counter:", counter)
}

func printMessage(message string) {
	for i := 0; i < 5; i++ {
		log.Println(message)
		time.Sleep(1 * time.Second)
	}
}

func incrementCounter(counter *int) {
	*counter = *counter + 1
}
