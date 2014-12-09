package main

import "fmt"


func intvalue( value int ) {
    value += 1
	fmt.Println("value= ",value)
}


func intPtr( val *int ) {
	*val = 345
	fmt.Println("Memory address of passed argument= ",val)
	fmt.Println("*val= ",*val)
}

func main() {

i := 0

intvalue(i)
intvalue(i)
intPtr(&i)
fmt.Println("i= ",i)

}
