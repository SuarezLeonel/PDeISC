/**
 * Encapsula todas las llamadas HTTP del frontend.
 * Se respetan rutas de API exclusivamente con método POST.
 */
export class ApiService {
  /**
   * @param {string} baseUrl
   */
  constructor(baseUrl = "") {
    this.baseUrl = baseUrl;
  }

  /**
   * Solicita una palabra nueva al backend.
   * @returns {Promise<{ word: string, hint: string }>}
   */
  async requestWord() {
    const response = await fetch(`${this.baseUrl}/api/word`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    });

    return this.#parseJsonResponse(response);
  }

  /**
   * Guarda un puntaje en la base de datos.
   * @param {{ nombre: string, tiempo: string, puntos: number, fecha: string }} payload
   * @returns {Promise<{ message: string }>}
   */
  async saveScore(payload) {
    const response = await fetch(`${this.baseUrl}/api/score`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    return this.#parseJsonResponse(response);
  }

  /**
   * Obtiene la tabla de posiciones mediante POST.
   * @returns {Promise<{ scores: Array<{ id: number, nombre: string, tiempo: string, puntos: number, fecha: string }> }>}
   */
  async fetchScores() {
    const response = await fetch(`${this.baseUrl}/api/scores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ limit: 10 })
    });

    return this.#parseJsonResponse(response);
  }

  /**
   * Valida y parsea una respuesta JSON de manera uniforme.
   * @param {Response} response
   * @returns {Promise<any>}
   */
  async #parseJsonResponse(response) {
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.message || "Ocurrió un error inesperado en la API.");
    }

    return payload;
  }
}
