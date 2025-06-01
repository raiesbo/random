package main

import "net/http"

func (app *Application) getRoutes() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("POST /log", app.WriteLog)

	return CorsMiddleware(mux)
}
