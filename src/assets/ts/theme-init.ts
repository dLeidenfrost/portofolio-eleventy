// Inlined in <head>: runs before first paint so the stored theme is applied without a flash.
import { applyTheme, getStoredTheme, getSystemTheme } from "./theme";

document.documentElement.classList.add("js");
applyTheme(getStoredTheme() ?? getSystemTheme());
