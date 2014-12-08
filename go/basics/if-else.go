package main

import "fmt"
import "time"

func main() {

roll := 11 

if roll > 10 {
		fmt.Println("Greater than 11")
		if roll >= 12 {
						fmt.Println("Greater than 12")
		} else if roll == 12 {
		                fmt.Println("Equal to 12")
		} else {
                        fmt.Println("Greater than 12")
        }
}

fmt.Println(time.Now().Weekday())
fmt.Println(time.Saturday)
}
						
