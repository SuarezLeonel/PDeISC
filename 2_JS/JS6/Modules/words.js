/**
 * Devuelve una palabra aleatoria desde una API pública de palabras en español.
 * @returns {Promise<{ word: string }>}
 */
export async function getRandomWordEntry() {
  try {
    const response = await fetch("https://random-word-api.herokuapp.com/word?lang=es");
    if (!response.ok) throw new Error("Error al consultar API de palabras");
    const words = await response.json();
    let word = words[0];
    // Normaliza la palabra (minúsculas, sin tildes) para compatibilidad con el juego
    word = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    return { word };
  } catch (error) {
    console.error("Fallo al obtener palabra desde API externa:", error);
    // Fallback seguro a una palabra simple si la API externa no responde
    const fallbackWords = [
      "javascript", "servidor", "modular", "frontend", "backend",
      "promesa", "interfaz", "variable", "algoritmo", "componente"
    ];
    const index = Math.floor(Math.random() * fallbackWords.length);
    return { word: fallbackWords[index] };
  }
}
