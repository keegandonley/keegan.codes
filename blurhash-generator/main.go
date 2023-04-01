package main

import (
	"context"
	"fmt"
	"sync"
	"time"

	"github.com/joho/godotenv"
	"golang.org/x/time/rate"

	"github.com/bbrks/go-blurhash"
)

type ImageMetadata struct {
	BlurHash string `json:"blurHash"`
	Width    int    `json:"width"`
	Height   int    `json:"height"`
}

func main() {
	godotenv.Load()

	objects := getObjects("k10y-assets").Contents

	hashes := make(map[string]ImageMetadata)

	limiter := rate.NewLimiter(rate.Every(time.Second), 10)
	var wg sync.WaitGroup

	for _, object := range objects {
		err := limiter.Wait(context.Background())
		if err != nil {
			fmt.Println("Error waiting for rate limiter:", err)
			continue
		}

		wg.Add(1)

		fileName := object.Key

		go func(fileName *string) {
			defer wg.Done()
			image, _ := downloadImage("https://static.donley.xyz/" + *fileName)

			blurHash, _ := blurhash.Encode(4, 3, image)

			metadata := ImageMetadata{
				Width:    image.Bounds().Dx(),
				Height:   image.Bounds().Dy(),
				BlurHash: blurHash,
			}

			hashes[*fileName] = metadata
		}(fileName)
	}

	wg.Wait()

	writeMapToJSONFile("../src/image-metadata.json", hashes)
}
