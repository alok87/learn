package main

import "fmt"

func main() {

	sqrs := make(map[int]int)
	var i,j,c,val,total int
	
	for i=1;i<=1000;i++ {
		val = i*i
		sqrs[i] = val
	}
	
	for i=1;i<=1000;i++ {
		for c=i+1;c<=1000;c++ {
			val=sqrs[i]+sqrs[c]
			for j=c+1;j<=1000;j++ {
				if sqrs[j]==val {
					total=i+c+j
					if total == 1000 {
						fmt.Println("Pytha Triplet having sum 1000=",i,c,j)
						fmt.Println("Product of this triplet=",i*c*j)
					}
				}
			}
		}
	}
}
