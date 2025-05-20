package main

import (
	"log"
	"net/http"
)

func (app *Application) Broker(w http.ResponseWriter, r *http.Request) {
	payload := jsonResponse{
		Error:   false,
		Message: "Hit the broker",
	}

	if err := app.writeJSON(w, http.StatusOK, payload); err != nil {
		log.Panic(err)
	}
}
