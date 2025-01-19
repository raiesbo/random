package main

import (
	"fmt"
	"sync"
)

func printSomething(s string, wg *sync.WaitGroup) {
	defer wg.Done()
	fmt.Println(s)
}

func main() {
	// With the "go" keyword we tell the compiler to execute the function in its own go rutine.
	// go printSomething("This is the FIRST thing to be printed!")

	var wg sync.WaitGroup

	words := []string{
		"alpha",
		"beta",
		"delta",
		"gamm",
		"pi",
		"zeta",
		"eta",
		"theta",
		"epsilon",
	}

	wg.Add(len(words))

	for i, x := range words {
		// The waitgroups should not be copied, they need to be passed as reference in
		// order to use the same.
		go printSomething(fmt.Sprintf("%d: %s", i, x), &wg)
	}

	wg.Wait()

	// time.Sleep(1 * time.Second)

	wg.Add(1)
	printSomething("This is the SECOND thing to be printed!", &wg)
}
