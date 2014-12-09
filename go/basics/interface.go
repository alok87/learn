package main

import "fmt"
import "math"


type geometry interface {
	area() float64
	perm() float64
}

type square struct {
	side float64
}

type circle struct {
	radius float64
}

func (s square) area() float64 {
	return s.side * s.side
}


func (s square) perm() float64 {
	return 4 * s.side
}

func (c circle) area() float64 {
	return math.Pi * c.radius * c.radius
}


func (c circle) perm() float64 {
	return 2 * math.Pi * c.radius
}	


func measure(g geometry) {
	fmt.Println(g)
	fmt.Println(g.area())
	fmt.Println(g.perm())
}

func main() {
	s := square{side: 2}
	c := circle{radius: 3}

	// So instead of writing below - 
	fmt.Println("Printing regular values without interface use")
		fmt.Println("Square Area=",s.area())
		fmt.Println("Square Perm=",s.perm())
		fmt.Println("Circle Area=",c.area())
		fmt.Println("Circle Perm=",c.perm())

	// We defined a interface geometry
	// We created a function measure which does the above calculation
	// More generatlisation using interface
	fmt.Println("Printing values on use of interface")
		measure(s)
		measure(c)
}
