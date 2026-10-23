export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const root = document.documentElement;
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

export function getStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

export function saveTheme(theme: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage blocked (private mode, disabled cookies): the choice lasts for this page only.
  }
}

export function getSystemTheme(): Theme {
  return darkQuery.matches ? "dark" : "light";
}

export function getTheme(): Theme {
  return root.dataset.theme === "dark" ? "dark" : "light";
}

export function applyTheme(theme: Theme): void {
  root.dataset.theme = theme;
}

export function onSystemThemeChange(callback: (theme: Theme) => void): void {
  darkQuery.addEventListener("change", (event) => callback(event.matches ? "dark" : "light"));
}
