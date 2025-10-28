package main

import (
	"fmt"
	"os"
)

const (
	logo = `
 __  __     __     ______
/\ \_\ \   /\ \   /\__  _\
\ \  __ \  \ \ \  \/_/\ \/
 \ \_\ \_\  \ \_\    \ \_\
  \/_/\/_/   \/_/     \/_/`
)

func main() {
	c := config{
		n: 100,
		c: 1,
	}
	if err := parseArg(&c, os.Args[1:]); err != nil {
		//fmt.Printf("%s\n%s", err, flag.Usage)
		os.Exit(1)
	}

	fmt.Printf("%s\n\nSending %d requests to %q (concurrenty: %d)\n", logo, c.n, c.url, c.c)

	//var (
	//	url = flag.String("url", "", "HTTP server URL (required)")
	//	n   = flag.Int("n", 1, "Number of requests")
	//	c   = flag.String("c", "", "Concurrency level")
	//	rps = flag.Int("rps", 1, "Requests per second")
	//)
	//flag.Parse()
	//args := flag.Args()
	//fmt.Println(*url, n, c, rps, " ... ", args)

}
