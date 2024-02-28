"use client";

import { createContext, useState } from "react";

export const LoadingContext = createContext({
  loading: false,
  setLoading: (loading: boolean) => {},
});

export default function LoadingProvider({ children }: any) {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}
