package main

import "fmt"
import "time"
import "math/rand"

func printer(n int) {
	for i:=0;i<10;i++ {
		fmt.Println("from",n,":",i)
	}
	amt := time.Duration(rand.Intn(250))
	time.Sleep(time.Millisecond * amt)
}

func main() {
	
	for i:=0;i<10;i++ {
		go printer(i)
	}
	
	var input string
	fmt.Scanln(&input)
}
