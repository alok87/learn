package main 

import "fmt"

func main() {

fmt.Println("First for loop")
i :=1 
for i<=3 {
			fmt.Println(i)
			i = i + 1
		 }
		 
fmt.Println("Second loop type")
for j :=4; j <= 6; j++ {
			fmt.Println(j)
}

fmt.Println("Third and last type of loop")
for {
		fmt.Println("Inside third type")
		break
	}
}	
