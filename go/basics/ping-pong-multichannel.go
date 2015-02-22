package main

import "fmt"
import "math/rand"
import "time"
import "strconv"

func from2(c2 chan <- string) {
	for i:=1;;i++ {
		c2 <- "from2,"+strconv.Itoa(i)
	}
}

func main() {
	c1 := make(chan string)
	c2 := make(chan string)

	//from1 closure function
	go func(){ 
		for i:=1;;i++ {
			c1 <- "from1,"+strconv.Itoa(i)
		}
	}()
	
	//from2 outside function
	go from2(c2)
	
	//printer function
	go func(){
		for i:=1;;i++ {
			select {
				case msg1 := <- c1:
					fmt.Println(msg1)
				case msg2 := <- c2:
					fmt.Println(msg2)
			}
			time.Sleep(time.Millisecond * time.Duration(rand.Intn(2500)))
		}
	}()		
	
	var input string
	fmt.Scanln(&input)
}
