package main

import "fmt"

func main (){

	 c1 := make(chan string, 1)
	 c2 := make(chan string, 2)
	 
	 select {
			case msg_recevd := <- c1:
					fmt.Println("Message Received: ", msg_recevd)
			// Below default was introduced, so that if in select block no cases receives a message then we move to default and it will result in a non blocking channel operation
			default:
					fmt.Println("No Messages Received")
	}

	msg_recevd := "hi"
	select {
		case c1 <-msg_recevd: 
					fmt.Println("Message Sent for c1: ", msg_recevd)
		default:
					fmt.Println("No Message Sent")
	}

	msg_recv := "hello"
	select {
		case c2 <-msg_recv: 
					fmt.Println("Message Sent for c2: ", msg_recv)
		default:
					fmt.Println("No Message Sent")
	}

	select {
		case msg_r := <- c1: 
				fmt.Println("Message Received for c1: ", msg_r)
		case msg_r2 := <- c2:
				fmt.Println("Message Received for c2: ", msg_r2)
		default:
				fmt.Println("No Message received")
	}
	
	fmt.Println(<-c1)

}
