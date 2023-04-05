package main

import (
	"fmt"
)

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
