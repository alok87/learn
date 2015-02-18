package main

import "fmt"

func main() {
	var i,sum1,j,sum2,diff int64
	sum1=0
	for i=1;i<=100;i++ {
		sum1+=i
	}
	sum1=sum1*sum1

	sum2=0
	for i=1;i<=100;i++ {
		j=i*i
		sum2+=j
	}
	
	diff = sum1 - sum2
	fmt.Println(diff)
}
