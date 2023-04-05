package main

import (
	"os"
	"strconv"
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

func writeCountToTsFile(filename string, count int) error {
	stringValue := "export const postCount = " + strconv.Itoa(count) + ";"
	return os.WriteFile(filename, []byte(stringValue), 0644)
}
