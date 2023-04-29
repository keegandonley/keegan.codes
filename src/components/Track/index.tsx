"use client";

import { useEffect } from "react";

export const Track = ({ inModal, slug }: TrackBody) => {
  useEffect(() => {
    fetch("/api/view", {
      method: "POST",
      body: JSON.stringify({
        slug: slug,
        inModal: inModal,
      } as TrackBody),
    });
  }, [inModal, slug]);

  return null;
};
