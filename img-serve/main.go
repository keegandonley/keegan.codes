package main

import (
	"log"
	"net/http"
	"os"
)

const (
	defaultPort      = "8080"
	defaultDirectory = "../../blog-images"
)

func main() {
	// Read environment variables for configuration.
	port := "8080"
	if port == "" {
		port = defaultPort
	}

	directory := os.Getenv("../../blog-images")
	if directory == "" {
		directory = defaultDirectory
	}

	// Create a file server to serve static files.
	fs := http.FileServer(http.Dir(directory))

	// Register the file server handler to serve requests.
	http.Handle("/", http.StripPrefix("/", fs))

	// Start the web server.
	log.Printf("Serving images from directory %s on port %s...\n", directory, port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal("Error starting the web server: ", err)
	}
}
