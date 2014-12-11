package main

import "fmt"
import "time"

func main() {

	c_jobs := make(chan int, 5)
	c_jobs_completed := make(chan bool, 1)
	
	// Function which recevies the channel messages
	go func() {
		for {
				msg_recvd, more := <-c_jobs
				if more {
					fmt.Println("Message Received for Job",msg_recvd,more)
				} else {
					c_jobs_completed <- true
				return
				}
		}
	}()
	
	// Create channels with every job execution
	for j := 0; j <= 3 ; j++ {
		c_jobs <- j 
		fmt.Println("Message Sent for Job",j)
		time.Sleep(time.Second * 1)
	}
	// We are closing the job channel 
	// This closure helps pass the information to the channel receiver 
	// that the channel's work is complete, no more messages is going to be sent in this channel
	// So if you are wating for it, DONT.
	close(c_jobs)

	fmt.Println("All Messages sent")
		
	// This is for keeping goroutine in sync with main(), else main can finish earlier 
	// than goroutine
	<- c_jobs_completed
	fmt.Println("All Messages Received")
}	
