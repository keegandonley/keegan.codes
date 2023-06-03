"use client";

import { useEffect } from "react";

export const HiTrack = ({ qrScanned, slug }: HiTrackBody) => {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      fetch("/api/view/hi", {
        method: "POST",
        body: JSON.stringify({
          slug: slug,
          qrScanned,
        } as HiTrackBody),
      });
    }
  }, [qrScanned, slug]);

  return null;
};
