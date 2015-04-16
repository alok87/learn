package main

import "fmt"
import "os"

func main() {

	for i:=1;;i++ {
		total := i
		for j:=i-1;j>0;j-- {
			total+=j
		}				
		divisors := 0
		for k:=i-1;k>0;k-- {
			if total%k == 0 {
				divisors+=1
			}
		}
		if divisors>500 {
			fmt.Println(total)
			os.Exit(1)
		}
	}
}
