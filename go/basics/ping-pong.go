package main

import "fmt"
import "time"
import "math/rand"
import "strconv"

func pinger(c chan string) {
	for i:=0;;i++ {
		msg := "Ping recvd from pinger"+strconv.Itoa(i)
		c <- msg
		time.Sleep(time.Millisecond * time.Duration(rand.Intn(2500)))
	}
}


func ponger(c chan string) {
	for i:=0;;i++ {
		c <- "Ping recvd from ponger"+strconv.Itoa(i)
		time.Sleep(time.Millisecond * time.Duration(rand.Intn(2500)))
	}
}

func printer(c chan string) {
	for i:=0;;i++ {
		msg := <- c
		fmt.Println(msg)
	}
}
		
func main() {
	c := make(chan string)

	go pinger(c)
	go ponger(c)
	go printer(c)
	
	var input string
	fmt.Scanln(&input)
}
