package main

import "fmt"
import "time"

func main() {

	c1 := make(chan string, 1)
	c2 := make(chan string, 1)
	
	go func() {
			time.Sleep(time.Second * 3)
			c1 <- "result1"
	}()
	
	select {
			case result := <- c1: 
					fmt.Println(result)
			//Timeout is needed because the select will make the program be waiting for this c1 channel msg for infiinite time.
			// We need to timeout the program if the message is not received within some time, below is how to timeout this select block
			// This program timeouts after 4 seconds and does not wait for c1 msg to be received.
			case <-time.After(time.Second * 4):
					fmt.Println("Timeout: value not received for c1 in 4 seconds")
    }
	
	go func() {
			time.Sleep(time.Second * 3)
			c2 <- "result2"
	}()
	
	select {
			case result := <- c1: 
					fmt.Println(result)
			// This switch block timeouts after 2 seconds and does not wait for c2 msg to be received.
			case <-time.After(time.Second * 2):
					fmt.Println("Timeout: value not received for c2 in 2 seconds")
    }
	
}	
	
