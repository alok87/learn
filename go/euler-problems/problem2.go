package main

import "time"
import "fmt"
import "flag"

func fibo(n int) (int) {
	if n == 1 {
		return 1
	} else if n == 2 {
		return 2
	} else {
		a := fibo(n - 1)
		b := fibo(n - 2)
		return a + b
	}
}

func main() {
	t_start := time.Now()
	j := 0
	sum := 0
	var N int
	flag.IntVar(&N,"N",10,"highest no in series not greater than what no?")
	flag.Parse()

	for i:=1;j<=N; i++ {
		j=fibo(i)
		if j%2 == 0 {
		fmt.Println(j)
		sum+=j
		}
	}
fmt.Println("Execution Time=",time.Since(t_start))
fmt.Println("Sum of even fibo series elements till N=",sum)
}

