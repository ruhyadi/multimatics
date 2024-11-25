package utils

import "fmt"

func BilangHallo() {
	fmt.Println("Hallo")
}

var Anon = func(angka ...int) (int, float64) {
	total := 0

	for _, v := range angka {
		total += v
	}
	rerata := float64(total) / float64(len(angka))
	return total, rerata
}
