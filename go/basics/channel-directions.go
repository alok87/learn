package main

import "fmt"

func func_s(msg_s chan<- string, msg_value string)  {   // Function which only sets the message

	msg_s <- msg_value

}

func func_d(msg_s chan<- string, msg_d chan<- string )  {  // Function which only receives the message

	msg_recev := <-msg_s
	msg_d <- msg_recev

}

func main()  {
	msg_s := make(chan string, 1)
	msg_d := make(chan string, 1) 
	func_s ( msg_s, "func_s sends the message msg_s")
	func_d( msg_s, msg_d)
	fmt.Println("Message Received was=", msg_d)
}
