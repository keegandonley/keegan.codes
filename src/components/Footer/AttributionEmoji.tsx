const emojiList = ['❤️', '🍺', '☕️', '❤️', '🍟', '🍷', '⚡️', '🧠', '❤️'];

export const AttributionEmoji = () => {
  const chosenEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];

  return <span>{chosenEmoji}</span>;
};
