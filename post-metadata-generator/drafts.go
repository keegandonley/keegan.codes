package main

import (
	"regexp"
)

var draftPattern = regexp.MustCompile(`(?m)^export const draft\s*=\s*true\s*;?`)

func isDraft(content string) bool {
	return draftPattern.MatchString(content)
}
