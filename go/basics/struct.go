package main

import "fmt"

type person struct {

	name string
	age int
	
}

func main() {

// Purpose of having structs: To keep collection of data-types together
//                            Useful for grouping data together to form records.

	fmt.Println(person{"Alok Kumar Singh", 26})
	fmt.Println(person{"Debashis Patil", 30})
	fmt.Println(person{"Sujai Prakasann", 32})
	fmt.Println(&person{"Vicky", 27})
	
	s := person{"Arun Kumar Singh", 58}
	fmt.Println(s.name)
	fmt.Println(s.age)

    s_copy := &s
	fmt.Println(s_copy.age)
	
	s_copy.age=34
	fmt.Println("s_copy.age",s_copy.age)
	fmt.Println("s.age=",s_copy.age)

}

