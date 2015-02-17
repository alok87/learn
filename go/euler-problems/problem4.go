package main

import "fmt"
import "os"

func check_palindrome(n int) int {
	rev := 0
	num := n
	for num > 0 {
		d := num % 10
		rev = 10*rev + d
		num /= 10
	}
	if n == rev {
		return 1
	} else {
		return -1
	}
}

func main() {
	var i, j, res, prod int
	for i = 999; i > 900; i-- {
		for j = i; j > 900; j-- {
			prod = i * j
			res = check_palindrome(prod)
			//fmt.Println(i,"*",j,"=",prod,res)
			if res == 1 {
				fmt.Println("Largest palindrome made from the product of two 3-digit numbers=", prod)
				os.Exit(0)
			}
		}
	}
}
