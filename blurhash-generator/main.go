package main

import (
	"bytes"
	"context"
	"encoding/base64"
	"fmt"
	"image/png"
	"os"
	"sync"
	"time"

	"github.com/esimov/stackblur-go"
	"github.com/joho/godotenv"
	"github.com/nfnt/resize"
	"golang.org/x/time/rate"
)

type ImageMetadata struct {
	// BlurHash string `json:"blurHash"`
	Width   int    `json:"width"`
	Height  int    `json:"height"`
	DataUrl string `json:"dataUrl"`
}

func main() {
	godotenv.Load()
	file := "../src/image-metadata.json"

	hashes, _ := readMapFromJSONFile(file)
	objects := getObjects("k10y-assets").Contents

	limiter := rate.NewLimiter(rate.Every(time.Second), 10)
	var wg sync.WaitGroup

	for _, object := range objects {
		wg.Add(1)

		fileName := object.Key
		_, ok := hashes[*fileName]

		go func(fileName *string, shouldProcess bool) {
			defer wg.Done()
			if !shouldProcess {
				fmt.Println("Skipping", *fileName)
				return
			}

			err := limiter.Wait(context.Background())
			if err != nil {
				fmt.Println("Error waiting for rate limiter:", err)
				return
			}

			image, _ := downloadImage("https://static.donley.xyz/" + *fileName)
			cropped, x, y := cropTransparent(image)

			blurredCropped, _ := stackblur.Process(cropped, 2000)

			// blurHash, _ := blurhash.Encode(4, 3, image)

			addedImage := addTransparent(image, blurredCropped, x, y)

			resizedImage := resize.Resize(50, 0, addedImage, resize.NearestNeighbor)

			// Encode the blurred image to JPEG
			var buf bytes.Buffer
			imgErr := png.Encode(&buf, resizedImage)
			if imgErr != nil {
				os.Exit(1)
			}

			// Base64-encode the image data
			encoded := base64.StdEncoding.EncodeToString(buf.Bytes())

			// Create a data URL with the appropriate MIME type
			dataURL := "data:image/png;base64," + encoded

			metadata := ImageMetadata{
				Width:  image.Bounds().Dx(),
				Height: image.Bounds().Dy(),
				// BlurHash: blurHash,
				DataUrl: dataURL,
			}

			hashes[*fileName] = metadata
		}(fileName, !ok)
	}

	wg.Wait()

	writeMapToJSONFile(file, hashes)
}
