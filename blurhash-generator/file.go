package main

import (
	"encoding/json"
	"io"
	"os"
)

func writeMapToJSONFile(filename string, m map[string]ImageMetadata) error {
	indentedJSON, err := json.MarshalIndent(m, "", "  ")
	if err != nil {
		return err
	}

	// Write the indented JSON data to the file
	err = os.WriteFile(filename, indentedJSON, 0644)
	if err != nil {
		return err
	}

	return nil
}

func readMapFromJSONFile(filename string) (map[string]ImageMetadata, error) {

	// Open the JSON file
	file, err := os.Open(filename)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	// Read the contents of the file
	bytes, err := io.ReadAll(file)
	if err != nil {
		return nil, err
	}

	// Unmarshal the JSON data into a map[string]string
	var data map[string]ImageMetadata
	err = json.Unmarshal(bytes, &data)
	if err != nil {
		return nil, err
	}

	return data, nil
}
