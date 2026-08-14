'use client';

import { useEffect, useState } from 'react';

const emojiList = ['❤️', '🍺', '☕️', '❤️', '🍟', '🍷', '⚡️', '🧠', '❤️'];

export const AttributionEmoji = () => {
  const [chosenEmoji, setChosenEmoji] = useState(emojiList[0]);

  useEffect(() => {
    setChosenEmoji(emojiList[Math.floor(Math.random() * emojiList.length)]);
  }, []);

  return <span>{chosenEmoji}</span>;
};
