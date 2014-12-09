package main

import "fmt"

func dummy() func() int {
	i := 0
	return func() int {
						 i += 1
						 return i
			}
}

func main() {


	closure1 := dummy()
	
	fmt.Println(closure1())
	fmt.Println(closure1())
	fmt.Println(closure1())
	
	closure2 := dummy()
	
	fmt.Println(closure2())
}	


