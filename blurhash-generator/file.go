package main

import (
	"encoding/json"
	"os"
)

func writeMapToJSONFile(filename string, m map[string]ImageMetadata) error {
	// Create the file
	file, err := os.Create(filename)
	if err != nil {
		return err
	}
	defer file.Close()

	// Create a JSON encoder for the file
	encoder := json.NewEncoder(file)

	// Write map content as JSON to the file
	err = encoder.Encode(m)
	if err != nil {
		return err
	}

	return nil
}
