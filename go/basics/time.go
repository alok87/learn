package main

import "time"
import "fmt"

func main() {
	p := fmt.Println

	now := time.Now()
	p("Just now", now)
	then := time.Date(1987, 8, 20, 4, 21, 9, 123456700, time.UTC)

	p("Year",then.Year())
	p("Month",then.Month())
	p("Day",then.Day())
	p("Weekday",then.Weekday())

	p(time.Since(then))
	p(now.Sub(then))
	p(then.After(now))
	p(then.Before(now))
	p(then.Equal(now))	

	time1 := time.Since(then)
	time2 := now.Sub(then)

	p("Diff",time.Hours()) 
}
