package main

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
	"log"
	"logger/data"
	"net/http"
	"time"
)

const (
	WebPort  = "80"
	RPCPort  = "5001"
	MongoURL = "mongodb://mongo:27017"
	//MongoURL = "mongodb://localhost:27017"
	gRPCPort = "50001"
)

var client *mongo.Client

type Application struct {
	Models data.Models
}

func main() {
	// Connect to mongo
	mongoClient, err := connectToMongo()
	if err != nil {
		log.Panic(err)
	}

	log.Println("Connected to Mongo")

	client = mongoClient

	// Disconnection context
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	// Close connection
	defer func() {
		if err = client.Disconnect(ctx); err != nil {
			panic(err)
		}
	}()

	app := Application{
		Models: data.New(mongoClient),
	}

	app.serve()
}

func (app *Application) serve() {
	srv := http.Server{
		Addr:    fmt.Sprintf(":%s", WebPort),
		Handler: app.getRoutes(),
	}

	log.Println("Starting Logger service on port", WebPort)
	if err := srv.ListenAndServe(); err != nil {
		log.Panic(err)
	}
}

func connectToMongo() (*mongo.Client, error) {
	clientOptions := options.Client().ApplyURI(MongoURL)
	clientOptions.SetAuth(options.Credential{
		Username: "admin",
		Password: "password",
	})

	return mongo.Connect(clientOptions)
}
