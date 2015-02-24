package main

import "fmt"
import "flag"
import "time"

func main() {
	
	t_start := time.Now()
	var i,N int

	flag.IntVar(&N,"N",10,"Fibonaci series till which number?")
	flag.Parse()

	i=1
	fibo(1,1,i,N)
	
	fmt.Println("Execution Time:",time.Since(t_start))
}	

func fibo(a int64, b int64,i int,N int) {
	if i<=N {
		fmt.Println(a)
		i+=1
		fibo(b, a+b, i, N)
	}
}
