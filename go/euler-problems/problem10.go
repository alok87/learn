package main

import "fmt"
import "math/big"

func isPrime(n int64) bool{
	i := big.NewInt(n)
	isPrime := i.ProbablyPrime(100)
	return isPrime
}

func main() {
	var i,total int64
	total=0
	for i=1;i<=1000000;i++ {
		isPrime := isPrime(i)
		if isPrime == true {
			total += i
		}
	}
	fmt.Println("Sum of primes below 2million=",total)
}
