package main

import "os"
import "fmt"

func main() {

	panic("A problem occurred")

	_,err := os.Create("/tmp/File")

	fmt.Println("Error Code=",err)
	if err!= nil {
		panic(err)
	}
}
