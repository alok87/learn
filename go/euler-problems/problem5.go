package main

import "fmt"
import "time"

func lcm(a int64, b int64) int64 {
	var  max, flag_found int64
	max = a
	flag_found = 0
	for flag_found == 0 {
		if max%a == 0 && max%b == 0 {
			flag_found=1
		}else{
		max += 1
		}
	}
	return max
}

func main() {
	t_start:=time.Now()
	var a, b, c int64
	a = 20 
	b = 19
	for b >=11 {
		c = lcm(a, b)
		b = b - 1
		a = c
	}
	fmt.Println("Smallest positive number that is evenly divisible by all of the numbers from 1 to 20 =", a)
	fmt.Println("Execution Time=",time.Since(t_start))
}
