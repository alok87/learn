package main

import "fmt"
import "sort"

type Bylength []string

func (s Bylength) Len() int {
	return len(s)
}

func (s Bylength) Swap(i int, j int) {
	s[i],s[j] = s[j],s[i]
}

func (s Bylength) Less(i, j int) bool {
	return len(s[i])< len(s[j])
}

func main() {
	teams := []string{"india", "australia", "newzeland"}
	sort.Sort(Bylength(teams))
	fmt.Println(teams)
}

	
