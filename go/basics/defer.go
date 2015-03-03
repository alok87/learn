package main

import "fmt"
import "os"

func main() {
	f := createFile("/tmp/alok-defer-check.go")
	defer closeFile(f)
	writeFile(f)
}

func createFile(fileName string) *os.File {
	fmt.Println("Creating File",fileName)
	f,err := os.Create(fileName)	
	if err!=nil {
		panic(err)
	}
	return f
}

func writeFile(f *os.File) {
	fmt.Println("Writing to file",f)
	fmt.Fprintln(f,"defer check")
}

func closeFile(f *os.File) {
	fmt.Println("Closing File",f)
	f.Close()
}	

