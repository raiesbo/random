package main

import (
	"chat-ws/internals/handlers"
	"log"
	"net/http"
)

func main() {
	log.Println("Starting channel listener")
	go handlers.ListenToWsChannel()

	log.Println("Starting web server on port 8080")

	if err := http.ListenAndServe(":8080", routes()); err != nil {
		log.Fatal(err)
	}
}
