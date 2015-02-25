package main

import "fmt"
import "time"
import "runtime"
import "flag" 

func main() {

	t_start := time.Now()
	runtime.GOMAXPROCS(runtime.NumCPU())
	var N int64	
	flag.Int64Var(&N,"N",600851475143,"largest prime factor of the number?")
	flag.Parse()

	ch := make(chan int64)
	defer close(ch)

	go factors(N,ch)	
	flag:=1
	for ;flag==1; { 
		var res int64 = <- ch 
		if res ==1 {
			flag=0
		}
	}
	fmt.Println("Execution Time:",time.Since(t_start))
	
}	

func factors(N int64, ch chan int64) {
	var i int64 = 2
	for N%i!=0 {
		i++
	}
	var res int64 = N/i
	ch <- res
	if res == 1{
		fmt.Println("Largest Prime Factor=",N)
	}else {
		go factors(res,ch)
	}
}

