/**
 * Calcula el score del jugador con base en rendimiento y tiempo.
 */
export class ScoreManager {
  /**
   * @param {number} maxAttempts
   */
  constructor(maxAttempts) {
    this.maxAttempts = maxAttempts;
  }

  /**
   * Genera una puntuación balanceada.
   * @param {{ attemptsLeft: number, uniqueHits: number, elapsedSeconds: number, status: string }} params
   * @returns {number}
   */
  calculate(params) {
    const basePoints = params.uniqueHits * 120;
    const attemptsBonus = params.attemptsLeft * 80;
    const victoryBonus = params.status === "won" ? 300 : 0;
    const speedBonus = Math.max(0, 240 - params.elapsedSeconds);
    const total = basePoints + attemptsBonus + victoryBonus + speedBonus;

    return Math.max(0, total);
  }
}
