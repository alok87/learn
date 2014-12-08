package main

import "fmt"

func main() {

var a [5]int
fmt.Println("array-initally:", a)
a[4]=100
fmt.Println("set:", a)
fmt.Println("get:", a[4])
fmt.Println("len:", len(a))

b := [5]int{1, 2, 3, 4, 5}
fmt.Println("array-initally:", b)

}
