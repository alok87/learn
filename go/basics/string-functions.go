package main

import "fmt"
import "strings"

func main() {

	s := "Alok Kumar Singh"

	fmt.Println("To Upper:,",strings.ToUpper(s))
	fmt.Println("Length:",len(s))
	fmt.Println("Contains:",strings.Contains(s,"Singh"))
	fmt.Println("Split:",strings.Split("20-03-2014","-"))
	fmt.Println("Join:",strings.Join([]string{"alok","kumar","singh"},""))
}
