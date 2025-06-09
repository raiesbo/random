package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
)

type Application struct {
	Mailer Mail
}

const (
	WebPort = "80"
)

func main() {
	app := Application{
		Mailer: createMail(),
	}

	log.Println("Starting mail service on port", WebPort)

	srv := http.Server{
		Addr:    fmt.Sprintf(":%s", WebPort),
		Handler: app.getRoutes(),
	}

	if err := srv.ListenAndServe(); err != nil {
		log.Panic(err)
	}
}

func createMail() Mail {
	port, _ := strconv.Atoi(os.Getenv("MAIL_PORT"))
	return Mail{
		Domain:      os.Getenv("MAIL_DOMAIN"),
		Host:        os.Getenv("MAIL_HOST"),
		Port:        port,
		Username:    os.Getenv("MAIL_USERNAME"),
		Password:    os.Getenv("MAIL_PASSWORD"),
		Encryption:  os.Getenv("MAIL_ENCRYPTION"),
		FromName:    os.Getenv("MAIL_NAME"),
		FromAddress: os.Getenv("MAIL_ADDRESS"),
	}
}
