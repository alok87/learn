package main

import "fmt"

func prime(n int64) (int64,int64) {
	var cnt,i int64
	cnt=0 
	for i=2; i<n && cnt==0; i++ {
		if n%i== 0 {
			cnt+=1
		}
	}
	if cnt>0 {
		return 0,n
	}else {
		return 1,n
	}
}
func main() {
	
	var num,i,j,prime_no int64
	num = 600851475143
	j=0
	
	for i=num/2;j==0;i-- {
		if num%i == 0 {
			j,prime_no=prime(i)
			if j==1 {
					fmt.Println("Largest prime factorial for ",num," =",prime_no)
			}
		}
	}
}
