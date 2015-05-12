package main
import "fmt"

type Animal interface {
	Speak() string 
}

type Dog struct {
	//name string
}

type Cat struct {
	//name string
}

func (d Dog) Speak() string {
	return "bhow"
	//return d.name + "bhow bhow"
}

func (c Cat) Speak() string {
	return "meow"
	//return c.name + "meow meow"
}


func main() {	
animals := []Animal{Dog{},Cat{}}
for _,animal := range animals {
	fmt.Println(animal.Speak())
	}
}
