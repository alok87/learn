package main

import "fmt"
import "time"

func main() {

t := time.Now().Weekday()

switch t {

case time.Saturday, time.Sunday: fmt.Println("Weekend ") 
default: fmt.Println("Weekday ")
	
}

}
