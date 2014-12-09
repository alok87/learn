package main

import "fmt"

func sumz(nums ...int) {

	total := 0
	for _, num := range nums {
		total += num
	}
	
	fmt.Print(nums, " ")
	fmt.Println(total)

}

func main() {	
		sumz(1, 2, 3)
		
		n := []int{1,2,3,4}
		sumz(n...)
		
}
