/**
 * Controlador principal del frontend del juego El Ahorcado.
 * - Maneja la interacción del usuario
 * - Comunica con el backend via ApiService
 * - Gestiona el estado del juego y la UI
 */
import { ApiService } from "../Modules/ApiService.js";
import { Game } from "../Modules/Game.js";
import { HangmanRenderer } from "../Modules/HangmanRenderer.js";
import { ScoreManager } from "../Modules/ScoreManager.js";
import { ThemeManager } from "../Modules/ThemeManager.js";
import { Timer } from "../Modules/Timer.js";
import { validateLetter } from "../Modules/validators.js";

/* Referencias a elementos del DOM para facilitar la manipulación */
const dom = {
  root: document.documentElement,
  themeToggle: document.querySelector("#themeToggle"),
  startButton: document.querySelector("#startGameButton"),
  restartButton: document.querySelector("#restartGameButton"),
  letterInput: document.querySelector("#letterInput"),
  letterButton: document.querySelector("#guessButton"),
  maskedWord: document.querySelector("#maskedWord"),
  usedLetters: document.querySelector("#usedLetters"),
  attemptsLeft: document.querySelector("#attemptsLeft"),
  time: document.querySelector("#timeElapsed"),
  points: document.querySelector("#currentPoints"),
  status: document.querySelector("#statusMessage"),
  hangmanFrame: document.querySelector("#hangmanFrame"),
  leaderboardButton: document.querySelector("#showLeaderboardButton"),
  leaderboardBody: document.querySelector("#leaderboardBody"),
  leaderboardStatus: document.querySelector("#leaderboardStatus"),
  saveForm: document.querySelector("#saveScoreForm"),
  playerName: document.querySelector("#playerName"),
  saveButton: document.querySelector("#saveScoreButton"),
  downloadButton: document.querySelector("#downloadPdfButton"),
  resultBadge: document.querySelector("#resultBadge")
};

const apiService = new ApiService("");
const timer = new Timer();
const hangmanRenderer = new HangmanRenderer();
const themeManager = new ThemeManager(dom.root, dom.themeToggle);
const scoreManager = new ScoreManager(6);

let game = null;
let lastResult = null;
let scoreSaved = false;

/**
 * Refresca la interfaz con el estado actual del juego.
 */
function renderGameState() {
  if (!game) {
    return;
  }

  const errors = game.maxAttempts - game.attemptsLeft;
  const currentPoints = scoreManager.calculate({
    attemptsLeft: game.attemptsLeft,
    uniqueHits: game.correctLetters.length,
    elapsedSeconds: timer.elapsedSeconds,
    status: game.status
  });

  dom.maskedWord.textContent = game.maskedWord;
  dom.usedLetters.textContent = game.usedLetters.length ? game.usedLetters.join(", ").toUpperCase() : "Sin letras utilizadas";
  dom.attemptsLeft.textContent = String(game.attemptsLeft);
  dom.time.textContent = timer.format();
  dom.points.textContent = String(currentPoints);
  dom.hangmanFrame.textContent = hangmanRenderer.render(errors);
  dom.resultBadge.textContent =
    game.status === "won" ? "Ganaste" : game.status === "lost" ? "Perdiste" : "En curso";
  dom.letterInput.disabled = game.status !== "playing";
  dom.letterButton.disabled = game.status !== "playing";
  dom.saveButton.disabled = game.status === "playing" || scoreSaved;
  dom.downloadButton.disabled = !lastResult;
}

/**
 * Muestra un mensaje de estado centralizado.
 * @param {string} message
 * @param {"success" | "error" | "info"} type
 */
function setStatus(message, type = "info") {
  dom.status.textContent = message;
  dom.status.dataset.type = type;
}

/**
 * Genera el PDF del resultado actual.
 */
function downloadScorePdf() {
  if (!lastResult || !window.jspdf?.jsPDF) {
    setStatus("No hay resultado disponible para exportar en PDF.", "error");
    return;
  }

  const pdf = new window.jspdf.jsPDF();
  pdf.setFontSize(18);
  pdf.text("Score del Ahorcado", 20, 20);
  pdf.setFontSize(12);
  pdf.text(`Jugador: ${dom.playerName.value.trim() || "Sin guardar"}`, 20, 40);
  pdf.text(`Resultado: ${lastResult.status === "won" ? "Victoria" : "Derrota"}`, 20, 50);
  pdf.text(`Palabra: ${lastResult.word.toUpperCase()}`, 20, 60);
  pdf.text(`Tiempo: ${lastResult.time}`, 20, 70);
  pdf.text(`Puntos: ${String(lastResult.points)}`, 20, 80);
  pdf.text(`Fecha: ${new Date(lastResult.date).toLocaleString("es-AR")}`, 20, 90);
  pdf.save("score-ahorcado.pdf");
}

/**
 * Carga y pinta la tabla de posiciones.
 */
async function loadLeaderboard() {
  dom.leaderboardStatus.textContent = "Cargando tabla de posiciones...";

  try {
    const data = await apiService.fetchScores();

    dom.leaderboardBody.innerHTML = data.scores
      .map(
        (score) => `
          <tr>
            <td>${score.nombre}</td>
            <td>${score.puntos}</td>
            <td>${score.tiempo}</td>
            <td>${new Date(score.fecha).toLocaleString("es-AR")}</td>
          </tr>
        `
      )
      .join("");

    if (!data.scores.length) {
      dom.leaderboardBody.innerHTML = `
        <tr>
          <td colspan="4">Aun no hay scores guardados.</td>
        </tr>
      `;
    }

    dom.leaderboardStatus.textContent = "Tabla actualizada correctamente.";
  } catch (error) {
    dom.leaderboardStatus.textContent = error.message;
  }
}

/**
 * Finaliza la partida y prepara el resultado.
 */
function finalizeGame() {
  timer.stop();

  lastResult = {
    status: game.status,
    word: game.originalWord,
    time: timer.format(),
    points: scoreManager.calculate({
      attemptsLeft: game.attemptsLeft,
      uniqueHits: game.correctLetters.length,
      elapsedSeconds: timer.elapsedSeconds,
      status: game.status
    }),
    date: new Date().toISOString()
  };

  scoreSaved = false;
  renderGameState();
}

/**
 * Crea una nueva partida solicitando la palabra al backend.
 */
async function startGame() {
  setStatus("Solicitando una nueva palabra al servidor...", "info");
  dom.startButton.disabled = true;

  try {
    const data = await apiService.requestWord();
    game = new Game({
      word: data.word,
      maxAttempts: 6
    });

    lastResult = null;
    scoreSaved = false;
    timer.start();
    renderGameState();
    setStatus("Partida iniciada. Ingresa una letra para comenzar.", "success");
    dom.letterInput.value = "";
    dom.playerName.value = "";
    dom.letterInput.focus();
  } catch (error) {
    setStatus(error.message, "error");
  } finally {
    dom.startButton.disabled = false;
  }
}

/**
 * Procesa un intento del usuario.
 */
function handleGuess() {
  if (!game) {
    setStatus("Primero debes iniciar una partida.", "error");
    return;
  }

  const validation = validateLetter(dom.letterInput.value);

  if (!validation.valid) {
    setStatus(validation.message, "error");
    return;
  }

  const result = game.guess(dom.letterInput.value);
  dom.letterInput.value = "";
  setStatus(result.message, result.hit ? "success" : result.repeated ? "info" : "error");
  renderGameState();

  if (result.status !== "playing") {
    finalizeGame();
  }
}

/**
 * Guarda el score finalizado usando POST hacia el backend.
 * @param {SubmitEvent} event
 */
async function handleSaveScore(event) {
  event.preventDefault();

  if (!lastResult) {
    setStatus("Todavia no existe un resultado para guardar.", "error");
    return;
  }

  const payload = {
    nombre: dom.playerName.value.trim(),
    tiempo: lastResult.time,
    puntos: lastResult.points,
    fecha: lastResult.date
  };

  try {
    await apiService.saveScore(payload);
    scoreSaved = true;
    renderGameState();
    setStatus("Score guardado correctamente en la base de datos.", "success");
    await loadLeaderboard();
  } catch (error) {
    setStatus(error.message, "error");
  }
}

/**
 * Refresca el contador de tiempo en la UI.
 */
function startClockPaint() {
  window.setInterval(() => {
    if (game) {
      renderGameState();
    }
  }, 1000);
}

themeManager.init();
dom.themeToggle.addEventListener("click", () => themeManager.toggle());
dom.startButton.addEventListener("click", startGame);
dom.restartButton.addEventListener("click", startGame);
dom.letterButton.addEventListener("click", handleGuess);
dom.letterInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleGuess();
  }
});
dom.leaderboardButton.addEventListener("click", loadLeaderboard);
dom.saveForm.addEventListener("submit", handleSaveScore);
dom.downloadButton.addEventListener("click", downloadScorePdf);

renderGameState();
startClockPaint();
loadLeaderboard();
