"use client";

import { useEffect, useState } from "react";

export const Delay = ({ children }: { children: any }) => {
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setRendered(true);
  }, []);

  return rendered ? children : null;
};
