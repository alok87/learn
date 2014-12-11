package main

import "fmt"
import "time"

func main() {

	c1 := make( chan string, 1)
	c2 := make( chan string, 1)
	
	go func() {			
			time.Sleep( time.Second * 1)
			c1 <- "one second passed"
	}()
	
	go func() {
			time.Sleep( time.Second * 3)
			c2 <- "three second passed"
	}()


// select lets you wait for multiple channel messages to arrive

	for i := 0; i < 2; i++ {
		select {
			case msg1 :=  <- c1: 
					fmt.Println("msg-loop: ", msg1, i )
			case msg2 :=  <- c2: hi
					fmt.Println("msg-loop: ", msg2, i )
			}

	}
}
