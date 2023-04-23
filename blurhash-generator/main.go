package main

import (
	"bytes"
	"context"
	"encoding/base64"
	"fmt"
	"image/jpeg"
	"os"
	"strings"
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

func executeBucket(file string, bucket string, bucketURL string) {
	hashes, _ := readMapFromJSONFile(file)
	objects := getObjects(bucket).Contents

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

			image, _ := downloadImage(bucketURL + *fileName)

			blurred, _ := stackblur.Process(image, 2000)

			// blurHash, _ := blurhash.Encode(4, 3, image)

			newImage := resize.Resize(100, 0, blurred, resize.NearestNeighbor)

			// Encode the blurred image to JPEG
			var buf bytes.Buffer
			imgErr := jpeg.Encode(&buf, newImage, &jpeg.Options{Quality: 75})
			if imgErr != nil {
				os.Exit(1)
			}

			// Base64-encode the image data
			encoded := base64.StdEncoding.EncodeToString(buf.Bytes())

			// Create a data URL with the appropriate MIME type
			dataURL := "data:image/jpeg;base64," + encoded

			metadata := ImageMetadata{
				Width:  image.Bounds().Dx(),
				Height: image.Bounds().Dy(),
				// BlurHash: blurHash,
				DataUrl: dataURL,
			}

			hashes[*fileName] = metadata
		}(fileName, !ok && !strings.Contains(*fileName, ".svg"))
	}

	wg.Wait()

	writeMapToJSONFile(file, hashes)
}

func postImages() {
	executeBucket("../src/image-metadata.json", "k10y-assets", "https://static.donley.xyz/")
	executeBucket("../src/galleries/barcelona/image-metadata.json", "k10y-gallery-barcelona", "https://barcelona.gallery.static.donley.xyz/")
}

func main() {
	godotenv.Load()
	postImages()
}
