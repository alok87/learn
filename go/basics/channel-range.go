package main

import "fmt"

func main() {

	queue := make(chan string, 4)
	
	queue <- "queue1"
	queue <- "queue2"
	queue <- "queue3"
	queue <- "queue4"
	close(queue)
	
	// Ranging over channel	
	for value := range queue {
		fmt.Println(value)
	}
}
