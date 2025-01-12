package main

import (
	"chat-ws/internals/handlers"
	"net/http"
)

func routes() http.Handler {
	mux := http.NewServeMux()

	fs := http.FileServer(http.Dir("./static"))
	mux.Handle("GET /static/", http.StripPrefix("/static", fs))

	mux.Handle("GET /", http.HandlerFunc(handlers.Home))
	mux.Handle("GET /ws", http.HandlerFunc(handlers.WsEndpoint))

	return mux
}
