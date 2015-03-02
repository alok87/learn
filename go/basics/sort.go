package main

import "fmt"
import "sort"

func main() {

	a := []string{"c","b","a"}
	fmt.Println("Before sorting",a)
	sort.Strings(a)
	fmt.Println("After sorting",a)
	fmt.Println("Is Sorted?",sort.StringsAreSorted(a))

	b := []int{87,1,9}
	fmt.Println("Before sorting",b)
	sort.Ints(b)
	fmt.Println("After sorting",b)
	fmt.Println("Is Sorted?",sort.IntsAreSorted(b))
}
