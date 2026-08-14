package main

import (
	"fmt"
)

func process(dir string, countFile string, slugsFile string, wordCountsFile string) {
	contents, err := loadFilesInDir(dir)
	if err != nil {
		fmt.Println(err)
		return
	}

	slugs := getSlugs(contents)
	writeSlugsToTsFile(slugsFile, slugs)

	writeCountToTsFile(countFile, len(slugs))

	wordCounts := getWordCounts(contents)
	writeWordCountsToJSONFile(wordCountsFile, wordCounts)

}

func main() {
	process("../src/posts", "../src/post-count.ts", "../src/post-slugs.ts", "../src/post-word-counts.json")
	process("../src/books", "../src/book-count.ts", "../src/book-slugs.ts", "../src/book-word-counts.json")

}
