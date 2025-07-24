import { useState, useEffect, useCallback } from "react";

type Theme = "light" | "dark" | "system";

/**
 * Custom hook for managing dark mode
 * Features:
 * - Reads initial preference from localStorage or system
 * - Persists preference to localStorage
 * - Applies dark class to document element
 * - Supports system preference detection
 */
export function useDarkMode() {
  const [theme, setTheme] = useState<Theme>("system");
  const [isDark, setIsDark] = useState(false);

  // Get system preference
  const getSystemPreference = useCallback(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  }, []);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedTheme = localStorage.getItem("issue-tracker-theme") as Theme;
        if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
          setTheme(savedTheme);
        }
      } catch (error) {
        console.error("Failed to load theme from localStorage:", error);
      }
    }
  }, []);

  // Apply theme changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    let shouldBeDark = false;

    switch (theme) {
      case "dark":
        shouldBeDark = true;
        break;
      case "light":
        shouldBeDark = false;
        break;
      case "system":
        shouldBeDark = getSystemPreference();
        break;
    }

    setIsDark(shouldBeDark);

    // Apply or remove dark class to document element
    const root = document.documentElement;
    if (shouldBeDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Save to localStorage
    try {
      localStorage.setItem("issue-tracker-theme", theme);
    } catch (error) {
      console.error("Failed to save theme to localStorage:", error);
    }
  }, [theme, getSystemPreference]);

  // Listen for system preference changes
  useEffect(() => {
    if (typeof window === "undefined" || theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      setIsDark(mediaQuery.matches);

      // Apply or remove dark class
      const root = document.documentElement;
      if (mediaQuery.matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const setLightMode = useCallback(() => setTheme("light"), []);
  const setDarkMode = useCallback(() => setTheme("dark"), []);
  const setSystemMode = useCallback(() => setTheme("system"), []);

  const toggleTheme = useCallback(() => {
    if (theme === "system") {
      setTheme(getSystemPreference() ? "light" : "dark");
    } else {
      setTheme(theme === "light" ? "dark" : "light");
    }
  }, [theme, getSystemPreference]);

  return {
    theme,
    isDark,
    setLightMode,
    setDarkMode,
    setSystemMode,
    toggleTheme,
  };
}
