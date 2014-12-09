package main

import "fmt"

func main() {

	m := make(map[string]int)
	
	m["k1"] = 1
	m["k2"] = 2
	
	fmt.Println("map m= ", m)
	
	v1 := m["k1"]
	fmt.Println("v1= ", v1)
	fmt.Println("Length= ", len(m))
	
	delete(m, "k2")
	fmt.Println("After deletion, m= ", m)
	
	
	_, prs := m["k2"]
	fmt.Println("Value of k2= ", prs)
	
	n := map[string]int{"foo":1,"bar":2}
	
    fmt.Println("Value of n= ", n)
	
}
