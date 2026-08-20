const STORAGE_KEY = "js6-theme";

/**
 * Gestiona el tema visual y su persistencia local.
 */
export class ThemeManager {
  /**
   * @param {HTMLElement} rootElement
   * @param {HTMLButtonElement} toggleButton
   */
  constructor(rootElement, toggleButton) {
    this.rootElement = rootElement;
    this.toggleButton = toggleButton;
  }

  /**
   * Inicializa el tema guardado previamente.
   */
  init() {
    const storedTheme = localStorage.getItem(STORAGE_KEY) || "dark";
    this.applyTheme(storedTheme);
  }

  /**
   * Alterna entre modo claro y oscuro.
   */
  toggle() {
    const nextTheme = this.rootElement.dataset.theme === "dark" ? "light" : "dark";
    this.applyTheme(nextTheme);
  }

  /**
   * Aplica el tema indicado a la UI.
   * @param {"dark" | "light" | string} theme
   */
  applyTheme(theme) {
    this.rootElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
    this.toggleButton.textContent = theme === "dark" ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro";
  }
}
