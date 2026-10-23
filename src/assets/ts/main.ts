import { applyTheme, getStoredTheme, getTheme, onSystemThemeChange, saveTheme, type Theme } from "./theme";

function initThemeToggle(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]");

  // Labels come from data attributes so they follow the page language.
  const syncLabels = (): void => {
    const isDark = getTheme() === "dark";
    buttons.forEach((button) => {
      const label = isDark ? button.dataset.labelToLight : button.dataset.labelToDark;
      if (label) button.setAttribute("aria-label", label);
    });
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
        label.textContent = button.dataset.copiedText ?? "Copied";
      } catch {
        label.textContent = button.dataset.failedText ?? "Copy failed";
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
