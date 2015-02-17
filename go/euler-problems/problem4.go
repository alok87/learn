package main

import "fmt"
import "os"

func check_palidrome(n int) {
	
func main() {
	
	var i,j,res,prod int
	for i=999; i>0; i-- {
		for j=i; j>0; j-- {
			prod=i*j
			res=check_palindrome(prod)
			if res == 1 {
				fmt.Println("Largest palindrome made from the product of two 3-digit numbers=",res)
				os.Exit(0)
			}
		}
	}
}
