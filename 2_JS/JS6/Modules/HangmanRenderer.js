/**
 * Genera una representación textual del ahorcado según errores cometidos.
 */
export class HangmanRenderer {
  constructor() {
    this.frames = [
      `
  +---+
  |   |
      |
      |
      |
      |
=========
      `,
      `
  +---+
  |   |
  O   |
      |
      |
      |
=========
      `,
      `
  +---+
  |   |
  O   |
  |   |
      |
      |
=========
      `,
      `
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========
      `,
      `
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========
      `,
      `
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========
      `,
      `
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========
      `
    ];
  }

  /**
   * Obtiene el frame correcto a partir de los intentos fallidos.
   * @param {number} errors
   * @returns {string}
   */
  render(errors) {
    return this.frames[Math.min(errors, this.frames.length - 1)];
  }
}
