package main

import "net/http"

func (app *Application) routes() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("POST /", app.Broker)

	mux.HandleFunc("POST /handle", app.HandleSubmission)

	return CorsMiddleware(mux)
}
