package main

import "fmt"
import "time"

func main() {

	t_start:=time.Now()
	
	requests := make(chan int,5)
	for i:=1;i<=5;i++ {
		requests <- i
	}
	close(requests)
	ch_ticker := time.Tick(time.Millisecond * 200)
	for recv:= range requests {
		<-ch_ticker 
		fmt.Println(recv,time.Now())
	}
	fmt.Println("Exec time=",time.Since(t_start))

	ch2_ticker := make(chan time.Time,3)
	for i:=1;i<=3;i++ {
		ch2_ticker <- time.Now()
	}
	
	go func() {
		for t:=  range time.Tick(time.Millisecond * 300) {
			ch2_ticker <- t		
		}
	}()
	
	for i:=1;i<=5;i++ {
		fmt.Println(i,<-ch2_ticker)
	}
	
}
	
	
	
