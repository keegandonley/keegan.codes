"use client";

import { useLinkClick } from "@/hooks/useLinkClick";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const DynamicWaves = dynamic(() => import("../Waves").then((mod) => mod.Waves));

export default function ClientInteraction() {
  useEffect(() => {
    document.body.classList.remove("preload");
  }, []);

  useLinkClick();

  // When pressing the back button, we need to remove the lockScroll class
  // so scrolling works. Otherwise, this is handled by the clicks on the modal
  // component
  useEffect(() => {
    window.addEventListener("popstate", function () {
      if (
        window.location.pathname.startsWith("/blog") ||
        window.location.pathname.startsWith("/library")
      ) {
        document.body.classList.remove("lockScroll");
      }
    });
  }, []);

  return (
    <>
      <DynamicWaves />
    </>
  );
}
