const LETTER_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]$/;
const PLAYER_NAME_REGEX = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]{3,20}$/;

/**
 * Normaliza texto a una forma comparable y amigable.
 * @param {string} value
 * @returns {string}
 */
export function normalizeText(value) {
  return String(value ?? "")
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/**
 * Valida una letra individual ingresada por el usuario.
 * @param {string} letter
 * @returns {{ valid: boolean, message: string }}
 */
export function validateLetter(letter) {
  const sanitizedLetter = String(letter ?? "").trim();

  if (!sanitizedLetter) {
    return { valid: false, message: "Ingresa una letra antes de continuar." };
  }

  if (!LETTER_REGEX.test(sanitizedLetter)) {
    return { valid: false, message: "Solo se permite una letra alfabética por intento." };
  }

  return { valid: true, message: "" };
}

/**
 * Valida los datos a persistir en el ranking.
 * @param {{ nombre?: string, tiempo?: string, puntos?: number, fecha?: string }} payload
 * @returns {{ valid: boolean, message: string }}
 */
export function validateScorePayload(payload) {
  if (!PLAYER_NAME_REGEX.test(String(payload.nombre ?? "").trim())) {
    return { valid: false, message: "El nombre debe tener entre 3 y 20 caracteres válidos." };
  }

  if (!String(payload.tiempo ?? "").trim()) {
    return { valid: false, message: "El tiempo de la partida es obligatorio." };
  }

  if (!Number.isInteger(Number(payload.puntos)) || Number(payload.puntos) < 0) {
    return { valid: false, message: "Los puntos enviados no son válidos." };
  }

  if (!String(payload.fecha ?? "").trim()) {
    return { valid: false, message: "La fecha del score es obligatoria." };
  }

  return { valid: true, message: "" };
}
