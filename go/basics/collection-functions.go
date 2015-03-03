package main

import "fmt"
import "strings"

func main() {
	teams := []string{"india","inewzeland","iaustralia","siouthafria"}

	fmt.Println("Indias Index=",Index(teams,"india"))
	fmt.Println("SouthAfrica Index=",Index(teams,"southafria"))
	
	fmt.Println("Is India a team ?",InSlice(teams,"india"))
	fmt.Println("Is Pakistan a team?",InSlice(teams,"pakistan"))	
	
	fmt.Println("Does one of the teams satisfy the predicate?",doesOne(teams, func(value string) bool {
								    return strings.HasPrefix(value,"i")
	}))

	fmt.Println("Does all the teams satisfy the predicate?",doesAll(teams, func(value string) bool {
								    return strings.Contains(value,"i")
	}))

	fmt.Println("Change to UpperCase:",changeUpper(teams,strings.ToUpper))

}

func Index(teams []string,s string) int {
	for index,value := range teams {
		if value == s {
			return index
		}
	}
	return -1
}

func InSlice(teams []string,s string) bool {
	return Index(teams, s) >= 0 
}

func doesOne(teams []string,f func(value string) bool) bool {
	for _,value := range teams {
		if f(value) {
				return true
		}
	}
	return false
}

func doesAll(teams []string, f func(value string) bool) bool {
	for _,value := range teams {
		if !f(value) {
			return false
		}
	}
	return true
}

func changeUpper(teams []string, f func(value string) string) []string {
	teams_new := make([]string,len(teams))
	for i,value := range teams {
		teams_new[i] = f(value)
	}
	return teams_new
}





