package main

import "fmt"
import "flag"
import "runtime"
import "time"

func generate(c chan <- int) {
	for i:=2;;i++ {
                        c <- i
                }
}

func filter(in <-chan int,out chan<- int,prime int) {
	for {
		number_c := <-in
		if number_c%prime != 0 {
			out <- number_c
		}
	}
}	

func main() {

	t_start := time.Now()

	//Maximum number of CPU allocation for this concurrent program's processing.
	numCPU:=runtime.NumCPU()
	runtime.GOMAXPROCS(numCPU)

	//Read the input from the command line for the maximum number till which we want to display primes	
	var tillN int
	flag.IntVar(&tillN,"tillN",10,"List the number till where you want to list primes")
	flag.Parse()
	tillN+=2

	//Channel creation for storing numbers generated
	c := make(chan int)
	defer close(c)  //defer used to close the channel just before main exists, so that we dont forget it

	//Go routine function to generate numbers and put the numbers in the channel c
	go generate(c)

	//Go routine function to use filter out the non prime numbers from the group
	for i:=2; i<tillN; i++ {
		number_c := <-c
		fmt.Println("Prime:",number_c)
		c1 := make(chan int)
		go filter(c, c1, number_c) 
		//^^ This function will reduce the channel list to contain only the numbers which are not divisible by number_c
		c = c1
		//^^reduced channel
	}
	
	fmt.Println("Execution Time",time.Since(t_start))
}

