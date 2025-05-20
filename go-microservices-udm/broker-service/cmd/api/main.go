package main

import (
	"fmt"
	"log"
	"net/http"
)

const (
	WebPort = "80"
)

type Application struct{}

func main() {
	app := Application{}

	log.Printf("Starting broker service on port %s\n", WebPort)

	srv := &http.Server{
		Addr:    fmt.Sprintf(":%s", WebPort),
		Handler: app.routes(),
	}

	if err := srv.ListenAndServe(); err != nil {
		log.Panic(err)
	}
}
