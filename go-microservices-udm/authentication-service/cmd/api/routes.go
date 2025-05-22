package main

import "net/http"

func (app *Application) getRoutes() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("POST /authenticate", app.Authenticate)

	return mux
}
