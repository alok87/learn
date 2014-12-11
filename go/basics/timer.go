package main

import "fmt"
import "time"

func main() {

// Use of timer is same as sleep. The only difference is 
// it can be stopped before the timer expires which is not possible in sleep.
// Timer represents a single event in the future.

	// This is a timer created whose work is to sleep for 2 seconds 
	// and when that time elapses it notifies via a channel.
	timer1 := time.NewTimer( time.Second * 2 )
	<- timer1.C
	fmt.Println("Timer1 expired")
	
	timer2 := time.NewTimer(time.Second * 3 )
	
	go func(){
			<- timer2.C
			fmt.Println("Timer 2 expired")
	}()
	
	stop_value := timer2.Stop()
	if stop_value {
		fmt.Println("Timer 2 stopped, it did not expire")
	}
	
}
	
	
