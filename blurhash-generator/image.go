package main

import (
	"fmt"
	"image"
	"image/draw"
	_ "image/gif"  // Register GIF format
	_ "image/jpeg" // Register JPEG format
	_ "image/png"  // Register PNG format

	_ "golang.org/x/image/bmp"  // Register BMP format
	_ "golang.org/x/image/tiff" // Register TIFF format
	_ "golang.org/x/image/webp" // Register WebP format

	"net/http"
)

func downloadImage(url string) (image.Image, error) {
	fmt.Println("Downloading image from", url)
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("bad status: %s", resp.Status)
	}

	img, _, err := image.Decode(resp.Body)
	if err != nil {
		return nil, err
	}

	return img, nil
}

func cropTransparent(inputImage image.Image) (image.Image, int, int) {
	bounds := inputImage.Bounds()
	minX, minY, maxX, maxY := bounds.Max.X, bounds.Max.Y, bounds.Min.X, bounds.Min.Y

	for y := bounds.Min.Y; y < bounds.Max.Y; y++ {
		for x := bounds.Min.X; x < bounds.Max.X; x++ {
			_, _, _, a := inputImage.At(x, y).RGBA()
			if a != 0 {
				if x < minX {
					minX = x
				}
				if x > maxX {
					maxX = x
				}
				if y < minY {
					minY = y
				}
				if y > maxY {
					maxY = y
				}
			}
		}
	}

	// If the entire image is transparent, return a 1x1 transparent pixel image
	if minX == bounds.Max.X || minY == bounds.Max.Y || maxX == bounds.Min.X || maxY == bounds.Min.Y {
		return image.NewRGBA(image.Rect(0, 0, 1, 1)), minX, minY
	}

	newRect := image.Rect(minX, minY, maxX+1, maxY+1)
	cropped := image.NewRGBA(newRect)
	draw.Draw(cropped, newRect, inputImage, newRect.Min, draw.Src)

	return cropped, minX, minY
}

func addTransparent(inputImage, cropped image.Image, minX, minY int) image.Image {
	originalBounds := inputImage.Bounds()
	newImage := image.NewRGBA(originalBounds)

	croppedBounds := cropped.Bounds()
	draw.Draw(newImage, croppedBounds.Add(image.Point{minX, minY}), cropped, croppedBounds.Min, draw.Src)

	return newImage
}
