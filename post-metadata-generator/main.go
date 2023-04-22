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

	contents, err := loadFilesInDir("../src/posts")
	if err != nil {
		fmt.Println(err)
		return
	}

	slugs := getSlugs(contents)
	writeSlugsToTsFile("../src/post-slugs.ts", slugs)

	wordCounts := getWordCounts(contents)
	writeWordCountsToJSONFile("../src/post-word-counts.json", wordCounts)

}
