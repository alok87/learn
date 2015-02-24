package main

import "fmt"
import "flag"
import "time"
import "runtime"

func main() {
	
	t_start := time.Now()
	var fibo_n int64 
	var i,N int

	flag.IntVar(&N,"N",10,"Fibonaci series till which number?")
	flag.Parse()
	runtime.GOMAXPROCS(runtime.NumCPU())

	ch := make(chan int64)
	defer close(ch)

	go fibo(1,1,ch)
	
	for i=1;i<=N;i++ {
		fibo_n = <- ch
		fmt.Println(fibo_n)
	}	
	fmt.Println("Execution Time:",time.Since(t_start))
}	

func fibo(a int64, b int64, ch chan<- int64) {
	ch <- a
	go fibo(b, a+b, ch)
}
