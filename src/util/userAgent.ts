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
// simple performance optimization used to render squares in the header,
// or determine images above the fold. It should NOT be used for conditional, important UI,
// such as a mobile menu. That way, if we get it wrong, it's not a big deal.
export const getIsLikelyMobile = () => {
  const h = headers();
  const userAgent = h.get("User-Agent");

  return toMatch.some((toMatchItem) => {
    return userAgent ? userAgent.match(toMatchItem) : false;
  });
};
