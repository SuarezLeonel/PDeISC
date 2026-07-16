import { normalizeText } from "./validators.js";

/**
 * Modelo principal del juego del ahorcado.
 */
export class Game {
  /**
   * @param {{ word: string, maxAttempts?: number }} config
   */
  constructor({ word, maxAttempts = 6 }) {
    this.originalWord = word;
    this.word = normalizeText(word);
    this.maxAttempts = maxAttempts;
    this.attemptsLeft = maxAttempts;
    this.usedLetters = [];
    this.correctLetters = [];
    this.status = "playing";
  }

  /**
   * Devuelve la palabra en formato oculto.
   * @returns {string}
   */
  get maskedWord() {
    return this.word
      .split("")
      .map((character) => (this.correctLetters.includes(character) ? character.toUpperCase() : "_"))
      .join(" ");
  }

  /**
   * Informa si la palabra ya fue completada.
   * @returns {boolean}
   */
  get isWordCompleted() {
    return this.word.split("").every((letter) => this.correctLetters.includes(letter));
  }

  /**
   * Procesa una letra ingresada por el usuario.
   * @param {string} rawLetter
   * @returns {{
   *  repeated: boolean,
   *  hit: boolean,
   *  message: string,
   *  status: "playing" | "won" | "lost"
   * }}
   */
  guess(rawLetter) {
    if (this.status !== "playing") {
      return {
        repeated: false,
        hit: false,
        message: "La partida ya finalizó. Inicia una nueva para continuar.",
        status: this.status
      };
    }

    const letter = normalizeText(rawLetter);

    if (this.usedLetters.includes(letter)) {
      return {
        repeated: true,
        hit: this.correctLetters.includes(letter),
        message: "Esa letra ya fue utilizada y no genera penalización.",
        status: this.status
      };
    }

    this.usedLetters.push(letter);

    if (this.word.includes(letter)) {
      this.correctLetters.push(letter);

      if (this.isWordCompleted) {
        this.status = "won";
        return {
          repeated: false,
          hit: true,
          message: "Excelente, completaste la palabra.",
          status: this.status
        };
      }

      return {
        repeated: false,
        hit: true,
        message: "Muy bien, esa letra existe en la palabra.",
        status: this.status
      };
    }

    this.attemptsLeft -= 1;

    if (this.attemptsLeft <= 0) {
      this.status = "lost";
      return {
        repeated: false,
        hit: false,
        message: `Partida terminada. La palabra correcta era ${this.originalWord.toUpperCase()}.`,
        status: this.status
      };
    }

    return {
      repeated: false,
      hit: false,
      message: "La letra no está en la palabra.",
      status: this.status
    };
  }
}
