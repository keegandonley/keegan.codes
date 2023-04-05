package main

import (
	"regexp"
	"strings"
)

func getSlugs(contents []string) []string {
	var slugs []string
	for _, content := range contents {
		if strings.Contains(content, "export const slug =") {
			r := regexp.MustCompile(`(?s)export const slug\s*=\s*"([^"]+)";`)
			matches := r.FindStringSubmatch(content)

			if len(matches) > 1 {
				slug := matches[1]
				slugs = append(slugs, slug)

			}
		}
	}

	return slugs
}
