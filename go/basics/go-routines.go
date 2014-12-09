package main

import "fmt"

func f1_sync( msg string ) {
	
	for i :=1; i<=3; i++ {
	fmt.Println("f1_sync(): ", i, msg)
	}
}

func main() {
	
	f1_sync("Synchronous/ Blocking Function Call")
	go f1_sync("Asynchronous/ Non Blocking Function Call | CONCURRENCY ")

	go func(msg string) {
        		fmt.Println("annonymous func(): ", msg)
        	}("Asynchronous/ Non Blocking Function Call | CONCURRENCY ")

	var input string
	fmt.Scanln(&input)
	fmt.Println("all done, good night!")
}

