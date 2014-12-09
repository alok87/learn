package main

import "fmt"
import "errors"

func f1(arg int) (int, error) {
	if arg == 42 {
		return -1, errors.New("Can not work with 42")
	}
		return arg + 3, nil
}

//custom error type
type argError struct {
	arg int 
	err_comment string
}

func (e *argError) Error() string {
	return fmt.Sprintf("%d - %s", e.arg, e.err_comment)
}

func f2(arg int) (int, error) {
	if arg == 42 {
		return -1, &argError{arg, "Can not work with it"}
	}
		return arg + 3, nil
}


func main() {

for _, i := range []int{7,42} {
	if r, e := f1(i); e != nil {
		fmt.Println("f1() failed:", e)
	} else {
		fmt.Println("f1() passed:", r)
	}
}

for _, i := range []int{7,42} {
	if r, e := f2(i); e != nil {
		fmt.Println("f2() failed:", e)
        } else {
                fmt.Println("f2() passed:", r)
        }
}

}
