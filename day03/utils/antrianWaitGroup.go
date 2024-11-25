package utils

import (
	"log"
	"runtime"
	"sync"
	"time"
)

func JalanAntrianWG() {
	runtime.GOMAXPROCS(2)
	var wg sync.WaitGroup

	wg.Add(3)

	go printMessageWG("Go Routine 1", &wg)
	go printMessageWG("Go Routine 2", &wg)
	go printMessageWG("Go Routine 3", &wg)

	wg.Wait()

	log.Println("Done")
}

func printMessageWG(message string, wg *sync.WaitGroup) {
	defer wg.Done()
	for i := 0; i < 5; i++ {
		log.Println(message)
		time.Sleep(1 * time.Second)
	}
}
