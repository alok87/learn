package main

import "fmt"
import "math/big"

func isPrime(n int64) int64 {
	i := big.NewInt(n)
	j := i.ProbablyPrime(1)
	if j == false {
		return -1
	} else {
		return 1
	}
}

func lcm(a int64, b int64) int64 {
	var isAPrime, isBPrime, max, flag_found int64
	isAPrime = isPrime(a)
	isBPrime = isPrime(b)
	if isAPrime == 1 || isBPrime == 1 {
		return a * b
	}

	max = a
	flag_found = 0
	for flag_found == 0 {
		if max%a == 0 && max%b == 0 {
			flag_found=1
		}
		max += 1
	}
return max
}

func main() {
	var a, b, c int64
	a = 20
	b = 19
	for b >= 11 {
		c = lcm(a, b)
		b = b - 1
		a = c
	}
	fmt.Println("Smallest positive number that is evenly divisible by all of the numbers from 1 to 20 =", a)
}
