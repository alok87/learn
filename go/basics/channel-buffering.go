package main

import "fmt"

func main() {

	// Channel by default will send singal <- only when there is a <- recevive signal
	// Bufffering can be enabled in channels by using thing like shown in this example.
	// Buffering allows channel to send signals upto a certain limit as sepcified in channel defination, to be sent without having a receive counter part for it.
	
	
	msg := make(chan string, 3) // This creates a channel msg with max 3 buffer values.
	
	msg  <- "msg1"
	msg <- "msg2"
	msg <- "msg3"
	
	fmt.Println(<- msg) //msg1
	fmt.Println(<- msg) //msg2
	fmt.Println(<- msg) //msg3
	
}
