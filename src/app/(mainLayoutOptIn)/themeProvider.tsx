"use client";

import { Theme } from "@/types/theme";
import { createContext, useState } from "react";

export const ThemeContext = createContext({
  theme: "dark",
} as {
  theme: Theme;
  setTheme: any;
});

export default function ThemeProvider({ children }: any) {
  const [theme, setTheme] = useState<Theme>("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
