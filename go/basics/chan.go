package main

import "fmt"
import "time"

func main() {

	c1:=make(chan string)	
	c2:=make(chan string)

	go func() {
		for i:=0;;i++ {
			c1 <- "one"
			time.Sleep(time.Second * 5)
		}
	}()

	go func() {
		for i:=0;;i++ {
			c2 <- "two"
			time.Sleep(time.Second * 10)
		}
	}()

	for i:=1;;i++ {
		select {
			case msg:= <- c1:
				fmt.Println("recvd",msg)
			case msg:= <- c2:
				fmt.Println("recvd",msg)
			case timer := <- time.After(time.Second * 1):
				fmt.Println("timedout:",i,"for",timer,"seconds")
		}
	}

}			
