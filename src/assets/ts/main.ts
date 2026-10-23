import { applyTheme, getStoredTheme, getTheme, onSystemThemeChange, saveTheme, type Theme } from "./theme";

function initThemeToggle(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]");

  const syncLabels = (): void => {
    const label = getTheme() === "dark" ? "Switch to light mode" : "Switch to dark mode";
    buttons.forEach((button) => button.setAttribute("aria-label", label));
  };

  buttons.forEach((button) =>
    button.addEventListener("click", () => {
      const next: Theme = getTheme() === "dark" ? "light" : "dark";
      applyTheme(next);
      saveTheme(next);
      syncLabels();
    }),
  );

  // Follow the OS setting until the visitor picks a theme explicitly.
  onSystemThemeChange((theme) => {
    if (getStoredTheme() !== null) return;
    applyTheme(theme);
    syncLabels();
  });

  syncLabels();
}

function initCopyButtons(): void {
  document.querySelectorAll<HTMLButtonElement>("[data-copy]").forEach((button) => {
    const label = button.querySelector<HTMLElement>("[data-copy-label]") ?? button;
    const idleText = label.textContent;
    let resetTimer: number | undefined;

    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copy ?? "");
        label.textContent = "Copied";
      } catch {
        label.textContent = "Copy failed";
      }
      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        label.textContent = idleText;
      }, 2000);
    });
  });
}

initThemeToggle();
initCopyButtons();
