package main

import "fmt"
import "sync/atomic"
import "runtime"
import "time"

func main() {
	var ops uint64

	for i:=0;i<10;i++ {
		go func() {
		      for {
			atomic.AddUint64(&ops,1)
			runtime.Gosched()
		      }
		}()
	}
	
	time.Sleep(time.Second)
		
	var ops_value uint64 = atomic.LoadUint64(&ops)
	fmt.Println("Value=",ops_value)	
}
