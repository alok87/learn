package main

import "os"

func main() {

	panic("A problem occurred")

	_,err := os.Create("/tmp/File")

	if err!= nil {
		panic(err)
	}
}
