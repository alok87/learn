package main

import "fmt"

func main() {

	msgs := make(chan string)
	
	go func() { msgs <- "Message coming from: func()" }()
		
	msg_recevd := <- msgs
	fmt.Println(msg_recevd)
}	
