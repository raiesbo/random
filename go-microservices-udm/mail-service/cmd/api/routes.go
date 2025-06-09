package main

import "net/http"

func (app *Application) getRoutes() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("POST /send", app.SendMail)

	return CorsMiddleware(mux)
}
