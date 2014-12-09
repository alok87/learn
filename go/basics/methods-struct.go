package main

import "fmt"

type rect struct {
	ht, wd int
}


func (r *rect) area() int {
	return r.ht * r.wd
}

func (r *rect) perm() int {
	return 2*r.ht + 2*r.wd
}


func main() {

	r := rect{ht: 2, wd: 4}
	
	fmt.Println("Area=",r.area())
	fmt.Println("Perm=",r.perm())

}	
