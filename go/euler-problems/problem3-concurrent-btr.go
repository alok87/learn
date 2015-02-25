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
	
	ch2 := make(chan int64)
	ch := make(chan int64)
	defer close(ch)

	go factors(N,ch,ch2)	
	flag:=1
	for ;flag==1; { 
		var res int64 = <- ch2 
		if res ==1 {
			flag=0
		}
	}
	fmt.Println("Execution Time:",time.Since(t_start))
}	

func generate(counter chan int64) {
	var i int64
	for i=2;;i++ {
		counter <- i
	}
}

func computeFactors(N int64, counter chan int64,ch chan int64) {	
	var i int64 = <- counter
	go computeFactors(N,counter,ch)
	fmt.Println(N,"/",i)
        if N%i==0 { 
			var res int64 = N/i
			ch <- res
			if res == 1{
               			 fmt.Println("Largest Prime Factor=",N)
			}
	}	
}

func factors(N int64, ch chan int64, ch2 chan int64) {	
	counter := make(chan int64)	
	go generate(counter)
	go computeFactors(N,counter,ch)
	var res int64 = <- ch
	if res!=1 {
		go factors(res,ch,ch2)
	}else {
		ch2 <- res
	}
}

