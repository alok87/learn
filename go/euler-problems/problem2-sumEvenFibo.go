package main

import "fmt"
import "flag"
import "time"
import "runtime"

func main() {
	
	t_start := time.Now()
	var fibo_n,fibo_t,N int64 
	var i int

	fibo_t = 0

	flag.Int64Var(&N,"N",10,"Fibonaci series till which number?")
	flag.Parse()
	runtime.GOMAXPROCS(runtime.NumCPU())

	ch := make(chan int64)
	defer close(ch)

	go fibo(1,2,ch)
	
	for i=0;fibo_n<=N;i++ {
		fibo_n = <- ch
		if fibo_n%2 == 0 {
			fmt.Println(fibo_n)
			fibo_t+=fibo_n
		
		}
	
	}	
	fmt.Println("Sum of Even Primes Total=",fibo_t)
	fmt.Println("Execution Time:",time.Since(t_start))
}	

func fibo(a int64, b int64, ch chan<- int64) {
	ch <- a
	go fibo(b, a+b, ch)
}
