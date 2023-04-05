package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"strconv"
)

func countFilesInDir(path string) (int, error) {
	files, err := ioutil.ReadDir(path)
	if err != nil {
		return 0, err
	}

	count := 0
	for _, file := range files {
		if file.Mode().IsRegular() {
			count++
		}
	}

	return count, nil
}

func writeCountToTsFile(filename string, count int) error {
	stringValue := "export const postCount = " + strconv.Itoa(count) + ";"
	return os.WriteFile(filename, []byte(stringValue), 0644)
}

func main() {
	count, err := countFilesInDir("../src/posts")
	excludedFileCount := 3
	countFile := "../src/post-count.ts"

	if err != nil {
		fmt.Println(err)
		return
	}

	writeCountToTsFile(countFile, count-excludedFileCount)

}
