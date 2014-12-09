package main

import "fmt"


func add(a int, b int) int {
return a+b
}


func main() {
res := add(1, 2)
fmt.Println("1+2=",res)
}
