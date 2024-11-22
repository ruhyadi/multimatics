package mathutils

func Square(n int) int {
	return n * n
}

func AreaRectangle(length int, width int) int {
	return length * width
}

func PerimeterRectangle(length int, width int) int {
	return 2 * (length + width)
}

func AreaCircle(radius int) float64 {
	return 3.14 * float64(radius) * float64(radius)
}

func areaCircle(radius int) float64 {
	return 3.14 * float64(radius) * float64(radius)
}
