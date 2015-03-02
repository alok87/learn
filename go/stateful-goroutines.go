package main

import "fmt"
import "time"
import "math/rand"
import "sync/atomic"

type readState struct {
	key int
	resp chan int
}

type writeState struct {
	key int
	value int
	resp chan bool 
}

func main() {

	var ops int64 = 0

	read_channel := make(chan *readState)
	write_channel := make(chan *writeState)
	
	// Single go routine holding managing the state stored in it.
	go func() {
		var state = make(map[int]int)
		for {
			select {
				case readObj := <-read_channel:
				     readObj.resp <- state[readObj.key]	
				case writeObj := <- write_channel:
				     state[writeObj.key]=writeObj.value
				     writeObj.resp <- true
			}	
		}
	}()
	
	// Multiple go routines trying to read from the single go routine's state variable.
	for i:=0;i<100;i++ {
		go func() {
			readStateObj := &readState{key: rand.Intn(5), resp: make(chan int)}
			read_channel <- readStateObj
			<-readStateObj.resp
			atomic.AddInt64(&ops,1)
		}()
	}
	
	// Multiple go routines trying to write to the single go routine's state variable.
	for i:=0;i<10;i++ {
		go func() {
			writeStateObj := &writeState{key: rand.Intn(5), value: rand.Intn(100), resp: make(chan bool)}
			write_channel <- writeStateObj
			<-writeStateObj.resp
			atomic.AddInt64(&ops,1)
		}()
	}
			
	    	time.Sleep(time.Second)
    		opsFinal := atomic.LoadInt64(&ops)
    		fmt.Println("ops:", opsFinal)
}	





