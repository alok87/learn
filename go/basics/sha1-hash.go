package main

import "crypto/sha1"
import "fmt"

func main() {
	s := "This is a hash string"
	fmt.Printf("%x\n",hash(s))
}

func hash(s string) []byte {
	h := sha1.New()
	h.Write([]byte(s))
	return h.Sum(nil)
}

