package main
/* 
	We have to destroy all the obsolete books in store. 
	Work is to take the books from the store and destory it in the incinerator.
	Worker-Goopher are the goophers doing this work.

*/
import "fmt"
import "time"
import "flag"

func worker_goophers(ch_books <-chan int, worker_id int, ch_books_burnt chan<- int) {
	for book:= range ch_books {
		t_start := time.Now()
		time.Sleep(time.Second * 1)
		fmt.Println("Book:",book," burnt in the incinerator by Goopher:",worker_id,"in",time.Since(t_start))
		ch_books_burnt <- book
	}
}

func main() {
	t_start := time.Now()
	var N,W int
	flag.IntVar(&N,"N",9,"Number of books to burn")
	flag.IntVar(&W,"W",3,"Number of goophers/workers")
	flag.Parse()
	
	ch_books := make(chan int,100)
	ch_books_burnt := make(chan int,100)
	
  //Create obsolete-books in store(/work)
	for b:=1;b<=N;b++ {
		ch_books <- b
	}
	close(ch_books)
	
  //Create worker-goophers who will take the book from store and destroy it.
	for w:=1;w<=W;w++ {
		go worker_goophers(ch_books,w,ch_books_burnt)
	}
	
  //Wait for all books to get burnt
	books_burnt:=0
	for books_burnt < N {
		<- ch_books_burnt
		books_burnt+=1	
	}
	fmt.Println("Total time in doing work=",time.Since(t_start))
}
