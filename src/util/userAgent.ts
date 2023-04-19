import { headers } from "next/headers";

const toMatch = [
  /Android/i,
  /webOS/i,
  /iPhone/i,
  /iPad/i,
  /iPod/i,
  /BlackBerry/i,
  /Windows Phone/i,
];

// Normally detecting a user agent like this is not a good idea, but this is a
// simple performance optimization to avoid rendering a lot of squares.
// If we get it wrong, it's not a big deal.
export const getIsLikelyMobile = () => {
  const h = headers();
  const userAgent = h.get("User-Agent");

  return toMatch.some((toMatchItem) => {
    return userAgent ? userAgent.match(toMatchItem) : false;
  });
};
