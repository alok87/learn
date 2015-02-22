package main

import "fmt"
import "time"
import "math/rand"
import "strconv"

func pinger(c chan string) {
	for i:=0;;i++ {
		msg := "Ping Transferred to channel from pinger"+strconv.Itoa(i)
		c <- msg
		time.Sleep(time.Millisecond * time.Duration(rand.Intn(250)))
	}
}


func ponger(c chan string) {
	for i:=0;;i++ {
		c <- "Ping Transferred to channel from ponger"+strconv.Itoa(i)
		time.Sleep(time.Millisecond * time.Duration(rand.Intn(250)))
	}
}

func printer(c chan string) {
	for i:=0;;i++ {
		msg := <- c
		fmt.Println(msg)
		time.Sleep(time.Millisecond * time.Duration(rand.Intn(250)))
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
