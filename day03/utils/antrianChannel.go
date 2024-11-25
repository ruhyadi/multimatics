package utils

import (
	"fmt"
	"log"
	"time"
)

func JalanAntrianChannel() {
	// create channel
	ch := make(chan string)

	go sendMessage("Goroutine", ch)
	// go sendMessage("Goroutine 2", ch)

	for msg := range ch {
		log.Println(msg)
	}

	log.Println("Done")

}

func sendMessage(message string, ch chan string) {
	for i := 1; i <= 5; i++ {
		ch <- fmt.Sprintf("%s %d", message, i)
		time.Sleep(1 * time.Second)
	}
	close(ch)
}
