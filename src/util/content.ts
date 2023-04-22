export const wpm = 140;

export const getReadingTime = (wordCount?: number) => {
  if (!wordCount) return 0;

  return Math.ceil(wordCount / wpm);
};
