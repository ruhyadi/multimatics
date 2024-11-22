package main

import "fmt"

func main() {

	fmt.Println("Hello BSI from Golang!")

	var address string = "Jakarta Selatan"
	fmt.Println(address)

	country := "Indonesia"
	fmt.Println(country)

	// var my_str string = "Hello BSI from Golang!"

	// for i := 0; i < len(my_str); i++ {
	// 	fmt.Println(string(my_str[i]))
	// }

	// constant
	const pi = 3.14
	const AppName = "GolangMadeEasy"
	fmt.Println(AppName)
	fmt.Println(pi)

	// casting
	var val32 int32 = 3250
	var val16 int16 = int16(val32)
	var int8 int8 = int8(val16)

	fmt.Println(val16)
	fmt.Println(val32)
	fmt.Println(int8)

	// slicing
	name := "Didi Ruhyadi"
	x := name[0]

	fmt.Println(name)
	fmt.Println(x)
	fmt.Println(string(x))

	// type definition
	type NoKTP string

	var ktpDidi NoKTP = "1234567890"
	fmt.Println(ktpDidi)

	// mathematics operation
	var name1 = "Didi"
	var name2 = "Ruhyadi"
	var result = name1 == name2
	fmt.Println(result)
}
