"use client"; // Required for Context in Next.js App Router

import { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of the context
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

// Create the context with an initial undefined value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Create the provider component
interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for consuming context with TypeScript safety
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
