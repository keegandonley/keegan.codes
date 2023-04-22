package main

import (
	"regexp"
	"strings"
)

type PostMetadata struct {
	Slug    string `json:"slug"`
	Height  int    `json:"height"`
	DataUrl string `json:"dataUrl"`
}

func getWordCounts(contents []string) map[string]int {
	lengthMap := make(map[string]int)

	for _, content := range contents {
		slug := ""
		if strings.Contains(content, "export const slug =") {
			r := regexp.MustCompile(`(?s)export const slug\s*=\s*"([^"]+)";`)
			matches := r.FindStringSubmatch(content)

			if len(matches) > 1 {
				slug = matches[1]
			}
		}

		if len(slug) > 0 {
			lengthMap[slug] = len(strings.Fields(content))
		}

	}

	return lengthMap
}
