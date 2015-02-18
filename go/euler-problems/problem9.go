import "fmt"
//import "os"

func main() {

	sqrs := make(map[int]int)
	//pytha := make(map[int][]int)
	var i,j,c,val int
	
	for i=1;i<=1000;i++ {
		val = i*i
		sqrs[i] = val
	}
	
	for i=1;i<=1000;i++ {
		for c=i+1;c<=1000;c++ {
			val=sqrs[i]+sqrs[c]
			for j=c+1;j<=1000;j++ {
				if sqrs[j]==val {
					fmt.Println(i,i+1,j)
					//os.Exit(1)
				}
			}
		}
	}
}
