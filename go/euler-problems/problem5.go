package main

import "fmt"
import "os"

func main() {
	fmt.Println("hi")
	var divisible int
	for i := 2520; i >= 2520; i++ {
		nums := []int{11, 12, 13, 14, 15, 16, 17, 18, 19, 20}
		divisible = 0
		for num := range nums {
			if i%num == 0 {
				divisible += 1
			}
			fmt.Println(divisible)
		}
		if divisible == 10 {
			fmt.Println("Smallest positive number that is evenly divisible by all of the numbers from 1 to 20", i)
			os.Exit(1)
		}
	}
}
