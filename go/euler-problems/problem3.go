//New method below
package main

import "fmt"
import "time"
import "flag"

func main() {
	t_start := time.Now()
	var N int64
	flag.Int64Var(&N,"N",600851475143,"largest prime factor of the number?")
        flag.Parse()
	factors(N)
	fmt.Println("Execution Time=",time.Since(t_start))
}
func factors(num int64) { 
	var i,res int64
	i = 2
	for ;num%i!=0; {
		i+=1
	}
	res = num/i
//	fmt.Println(num,"/",i,"=",res)
	if res!=1 {
		factors(res)
	}else if res ==1 {
		fmt.Println("Largest Prime factor=",i)
	}
}
// Old method below
/*package main

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
*/
