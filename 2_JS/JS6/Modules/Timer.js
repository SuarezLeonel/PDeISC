/**
 * Controla el tiempo transcurrido en una partida.
 */
export class Timer {
  constructor() {
    this.elapsedSeconds = 0;
    this.intervalId = null;
  }

  /**
   * Reinicia y comienza el conteo.
   */
  start() {
    this.stop();
    this.elapsedSeconds = 0;
    this.intervalId = window.setInterval(() => {
      this.elapsedSeconds += 1;
    }, 1000);
  }

  /**
   * Detiene el conteo actual.
   */
  stop() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Devuelve el tiempo formateado en mm:ss.
   * @returns {string}
   */
  format() {
    const minutes = String(Math.floor(this.elapsedSeconds / 60)).padStart(2, "0");
    const seconds = String(this.elapsedSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  }
}
