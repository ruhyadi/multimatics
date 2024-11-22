package main

import (
	"day02/mathutils"
	"fmt"
	"strings"
)

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
	var name2 = "didi"
	var result = name1 == name2
	fmt.Println(result)

	result = strings.EqualFold(name1, name2)
	fmt.Println(result)

	result = strings.ToLower(name1) == strings.ToLower(name2)
	fmt.Println(result)

	// use mathutils
	area := mathutils.AreaRectangle(10, 5)
	fmt.Println("Area of rectangle: ", area)

	areaCircle := mathutils.AreaCircle(10)
	fmt.Println("Area of circle: ", areaCircle)

	fmt.Println("Masukan nama dan alamat (pisahkan dengan spasi): ")
	var (
		name3    string
		address1 string
	)
	fmt.Scan(&name3, &address1)
	fmt.Printf("Nama: %s, Alamat: %s\n", name3, address1)

	// menghitung luas dan keliling persegi panjang
	fmt.Println("Selamat datang di program menghitung luas dan keliling persegi panjang")
	fmt.Println("Masukan panjang dan lebar (pisahkan dengan spasi): ")
	var (
		w1, l1 int
	)
	fmt.Scan(&w1, &l1)
	areaRectangle := mathutils.AreaRectangle(w1, l1)
	perimeterRectangle := mathutils.PerimeterRectangle(w1, l1)

	fmt.Printf("Luas persegi panjang: %d\n", areaRectangle)
	fmt.Printf("Keliling persegi panjang: %d\n", perimeterRectangle)
}
