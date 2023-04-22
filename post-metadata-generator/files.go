package main

import (
	"encoding/json"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func countFilesInDir(path string) (int, error) {
	files, err := os.ReadDir(path)
	if err != nil {
		return 0, err
	}

	count := 0
	for _, file := range files {
		if file.Type().Perm().IsRegular() {
			count++
		}
	}

	return count, nil
}

func loadFilesInDir(path string) ([]string, error) {
	files, err := os.ReadDir(path)
	if err != nil {
		return nil, err
	}

	var fileContents []string

	for _, file := range files {
		if file.Type().Perm().IsRegular() && file.Name() != "template.mdx" {
			// load the file contents
			filePath := path + "/" + file.Name()
			content, err := os.ReadFile(filePath)
			if err != nil {
				return nil, err
			}
			fileContents = append(fileContents, string(content))

		}
	}

	return fileContents, nil
}

func writeCountToTsFile(filename string, count int) error {
	stringValue := "export const postCount = " + strconv.Itoa(count) + ";"
	return os.WriteFile(filename, []byte(stringValue), 0644)
}

func writeSlugsToTsFile(filename string, slugs []string) error {
	constTemplate := "export const slugs = [%s];"
	quotedSlugs := make([]string, len(slugs))
	for i, slug := range slugs {
		quotedSlugs[i] = fmt.Sprintf("'%s'", slug)
	}
	slugsString := strings.Join(quotedSlugs, ", ")
	content := fmt.Sprintf(constTemplate, slugsString)

	err := os.WriteFile(filename, []byte(content), 0644)
	return err
}

func writeWordCountsToJSONFile(filename string, wordCounts map[string]int) error {
	jsonData, err := json.MarshalIndent(wordCounts, "", "  ")
	if err != nil {
		fmt.Printf("Error marshalling JSON: %v", err)
		return err
	}

	err = os.WriteFile(filename, jsonData, 0644)
	if err != nil {
		fmt.Printf("Error writing JSON to file: %v", err)
		return err
	}

	return err
}
