package main

import "fmt"
import "time"
import "runtime"
import "flag"

func main() {
	t_start:=time.Now()
	runtime.GOMAXPROCS(runtime.NumCPU())
	var N int64
	flag.Int64Var(&N,"N",100,"till which no?")
	flag.Parse()

	ch1 := make(chan int64)
	ch2 := make(chan int64)
	defer close(ch1)
	defer close(ch2)
	
	go sum_square(N,ch1)
	go square_sum(N,ch2)

	var sum1,sum2 int64
	var diff int64 =0
	for diff==0 {
		select {
		case sum1 = <- ch1:
			diff = sum1 - <-ch2
		case sum2 = <- ch2:
			diff = <-ch1 - sum2
		//case <-time.After(time.Microsecond * 1):
        	//	fmt.Println("Processing..")
		}
	}
	fmt.Println(diff)
	fmt.Println("Execution Time=",time.Since(t_start))
}

func sum_square(N int64, ch1 chan int64) {

	var i,sum1 int64
	sum1=0
	for i=1;i<=N;i++ {
		sum1+=i
	}
	sum1=sum1*sum1
	ch1 <- sum1
}

func square_sum(N int64, ch2 chan int64) {
	
	var i,j,sum2 int64
	sum2=0
	for i=1;i<=N;i++ {
		j=i*i
		sum2+=j
	}
	ch2 <- sum2	
}
