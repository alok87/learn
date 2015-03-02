package main

import "fmt"
import "time"
import "runtime"
import "sync"
import "sync/atomic"
import "math/rand"

func main() {

	var ops int64 = 0
	var state = make(map[int]int)
	var mutex = &sync.Mutex{}

	for i:=1;i<100;i++ {
		go func() { 
			for {
				key := rand.Intn(5)
				value := rand.Intn(100) 
				mutex.Lock()
				state[key]=value
				mutex.Unlock()
				atomic.AddInt64(&ops,1)
				runtime.Gosched()
			}
		}()
	}
	
	for j:=1;j<100;j++ {
		go func() { 
			total := 0
			for {
				key := rand.Intn(5)
				mutex.Lock()
				total+=state[key]	
				mutex.Unlock()
				atomic.AddInt64(&ops,1)
				runtime.Gosched()
			}
		}()
	}

	time.Sleep(time.Second)
	
	opsCurrent := atomic.LoadInt64(&ops)
	fmt.Println("Ops Current Value=",opsCurrent)

	mutex.Lock()
	fmt.Println("State Current Status=",state)
	mutex.Unlock()

}
	
	
		

