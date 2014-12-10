package main

import "fmt"
import "time"

func worker( func_complete chan bool ) {
	fmt.Println("Started func worker()")
	time.Sleep(time.Second)
	fmt.Println("Completed func worker()")
	func_complete <- true
}

func main() {
	fmt.Println("Started func main()")
	func_complete := make( chan bool, 1)
	go worker ( func_complete )	

	// Introducing the blocking message which allows our main function to receive message from worker function or whatever functon 
	// and then move ahead to ending main
	// Comment the below sentence and  the main func() will complete before even waiting for work func to complete.
	<- func_complete

    fmt.Println("All completed, ending main()")
}	


