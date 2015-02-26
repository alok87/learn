package main

import "fmt"
import "time"

func check_palindrome(i int,j int,ch chan int) {
	rev := 0
	num := i*j 
	n := num
	for num > 0 {
		d := num % 10
		rev = 10*rev + d
		num /= 10
	}
	if n == rev {
		ch <- n		
	} else {
		ch <- 1
	}
}

func i_incrementer(ch1 chan int) {
	for i:=999; i>900; i-- {
		ch1 <- i
	} 
}

func main() {
	t_start:=time.Now()

	ch := make(chan int)
	ch1 := make(chan int)
	defer close(ch)
	defer close(ch1)

	go i_incrementer(ch1)
	go findoutPalindrome(ch,ch1)

	var res int=1	
	for ;res==1; {
		res = <- ch
		//fmt.Println(res)
	}
	fmt.Println("Largest palindrome made from the product of two 3-digit numbers=",res)
	fmt.Println("Execution Time=",time.Since(t_start))
}

func findoutPalindrome(ch chan int,ch1 chan int) {
	i:= <- ch1
		for j := i; j > 900; j-- {
			go check_palindrome(i,j,ch)
		}
	go findoutPalindrome(ch,ch1)
}	
	
