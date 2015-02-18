package main

import "fmt"
import "math/big"

func isPrime(n int64) bool{
	i := big.NewInt(n)
	isPrime := i.ProbablyPrime(1)
	return isPrime
}

func main() {
	var i,found int64
	found = 0
	i = 0
	for ;found!=10001; {
		isPrime := isPrime(i)
		if isPrime == true { 
			found+=1
			if found == 10001 {
				fmt.Println("Prime:",i,"Number-",found)
			}
		}	
	i+=1
	}
}
