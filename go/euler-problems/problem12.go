package main

import "fmt"
import "os"

func main() {
	for i:=1;;i++ {
		total := 0
		j := i-1
		s := make([]int,j)
		for j=i-1;j>=1;j-- {

			total=total+j
			s = append(s,j)
		}
		for k:=0;k>=len(s);k++ {
			if total%s[k] != 0 {
				s = append(s[:k], s[k+1:]...)
			}
		}
		fmt.Println(i,": ",s)
		if i > 10 {
			os.Exit(0)
		}
	}
}
