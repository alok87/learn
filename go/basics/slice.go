package main 

import "fmt"

func main() {

	s := make([]string, 3)
	fmt.Println("array initial:", s)

	s[0] = "a"
	s[1] = "b"
	s[2] = "c"

	fmt.Println("array value set:", s)
	fmt.Println("array 2nd value:", s[2])
	fmt.Println("array length:", len(s))
	
	s = append(s, "d")
	s = append(s, "e", "f")
	fmt.Println("array after append:", s)

	c := make([] string, len(s))
	copy(c,s)
	fmt.Println("array c, a copy of s=", c)

	l := s[2:5]
	fmt.Println("slice 2:5", l)

	l = s[:5]
	fmt.Println("slice :5", l)

	l = s[2:]
	fmt.Println("slice 2:", l)

	new := []string{"d", "h", "i"}
	fmt.Println("new array value=", new)
	

}
