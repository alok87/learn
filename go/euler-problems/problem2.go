package main
import "fmt"
func fibo(n int) (int) {
if n == 1 {
return 1
} else if n == 2 {
return 2
} else {
a := fibo(n - 1)
b := fibo(n - 2)
return a + b
}
}
func main() {
j := 0
sum := 0
for i:=1;j<=4000000; i++ {
j=fibo(i)
if j%2 == 0 {
sum+=j
}
}
fmt.Println("Total Sum=",sum)
}

