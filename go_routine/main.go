package main

import (
	"fmt"
	"os"
	"sync"
)

func writeCharToFile(filename string, char rune, wg *sync.WaitGroup) {
	defer wg.Done() // Decrement the counter when the goroutine completes

	file, err := os.OpenFile(filename, os.O_APPEND|os.O_WRONLY, 0644)
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	_, err = file.WriteString(string(char) + "\n")
	if err != nil {
		fmt.Println("Error writing to file:", err)
		return
	}
}

func main() {
	var wg sync.WaitGroup
	filename := "output.txt"

	// Create or truncate the file before writing
	file, err := os.Create(filename)
	if err != nil {
		fmt.Println("Error creating file:", err)
		return
	}
	file.Close()

	text := "123456789"
	for _, char := range text {
		wg.Add(1) // Increment the counter
		go writeCharToFile(filename, char, &wg)
	}

	wg.Wait() // Block until the counter is zero
	fmt.Println("Finished writing to file")
}
