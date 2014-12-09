package main

import "fmt"

func main() {

	// In a slice 
	
	nums := []int{1, 2, 3}
	sum := 0
	
	for _,num := range nums {
	sum += num
	}
	
	fmt.Println("Sum= ",sum)
	
	colors := []string{"red", "green", "yellow", "blue"}
	
	for index,name := range colors {
	fmt.Println("%s > %s", index, name)
	}
	
	// In a map/hash
	
	colours := map[string]int{"red": 1, "yellow": 2, "green": 3, "blue": 4}
	
	for key,value := range colours {
	fmt.Println("%s > %s", key, value)
	}
	
}	
