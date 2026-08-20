/**
 * Servidor principal del juego El Ahorcado.
 * - Implementa API REST solo con POST (por regla del proyecto)
 * - Conexión a MySQL para guardar scores
 * - Sirve archivos estáticos del frontend
 */
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ensureScoreTable, getTopScores, readConfig, saveScore } from "./Modules/Database.js";
import { validateScorePayload } from "./Modules/validators.js";
import { getRandomWordEntry } from "./Modules/words.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

/**
 * Middleware globales.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Recursos estáticos del proyecto.
 * La restricción de solo POST aplica a la API de negocio.
 */
app.use("/Pages", express.static(path.join(__dirname, "Pages")));
app.use("/Scripts", express.static(path.join(__dirname, "Scripts")));
app.use("/Styles", express.static(path.join(__dirname, "Styles")));
app.use("/Modules", express.static(path.join(__dirname, "Modules")));
app.use("/vendor/jspdf", express.static(path.join(__dirname, "node_modules", "jspdf", "dist")));

/**
 * Punto de entrada visual.
 */
app.get("/", (_request, response) => {
  response.sendFile(path.join(__dirname, "Pages", "index.html"));
});

/**
 * Middleware para manejar métodos no permitidos en rutas de API (como GET).
 */
app.use("/api", (request, response, next) => {
  if (request.method !== "POST") {
    return response.status(405).json({
      message: "Esta API solo acepta peticiones POST. Usa la interfaz web en http://localhost:3000"
    });
  }
  next();
});

/**
 * Devuelve una palabra aleatoria del juego desde API pública (o fallback).
 * Esta operación usa POST por regla del proyecto.
 */
app.post("/api/word", async (_request, response) => {
  try {
    const wordEntry = await getRandomWordEntry();
    response.status(200).json(wordEntry);
  } catch (error) {
    console.error("Error al obtener palabra:", error);
    response.status(500).json({ message: "No fue posible cargar la palabra del juego." });
  }
});

/**
 * Guarda un score validado.
 */
app.post("/api/score", async (request, response) => {
  try {
    const validation = validateScorePayload(request.body);

    if (!validation.valid) {
      return response.status(400).json({ message: validation.message });
    }

    await saveScore({
      nombre: String(request.body.nombre).trim(),
      tiempo: String(request.body.tiempo).trim(),
      puntos: Number(request.body.puntos),
      fecha: String(request.body.fecha).trim()
    });

    return response.status(201).json({ message: "Score guardado correctamente." });
  } catch (error) {
    console.error("Error al guardar score:", error);
    return response.status(500).json({
      message: "No fue posible guardar el score. Verifica la conexion a MySQL y la configuracion."
    });
  }
});

/**
 * Obtiene la tabla de posiciones via POST.
 */
app.post("/api/scores", async (request, response) => {
  try {
    const limit = Number(request.body.limit ?? 10);
    const scores = await getTopScores(limit);
    return response.status(200).json({ scores });
  } catch (error) {
    console.error("Error al consultar scores:", error);
    return response.status(500).json({
      message: "No fue posible consultar la tabla de posiciones."
    });
  }
});

/**
 * Inicializa servidor y tabla requerida.
 */
async function bootstrap() {
  try {
    const { server } = await readConfig();
    const port = Number(server.port ?? 3000);

    try {
      await ensureScoreTable();
      console.log("Conexion MySQL verificada y tabla `score` lista.");
    } catch (databaseError) {
      console.warn(
        "No se pudo verificar MySQL al iniciar. La interfaz arrancara igual, pero las funciones de score dependeran de corregir la conexion."
      );
      console.warn(databaseError);
    }

    app.listen(port, () => {
      console.log(`Servidor disponible en http://localhost:${port}`);
      console.log("API configurada con POST para lectura y escritura de datos.");
    });
  } catch (error) {
    console.error("No fue posible iniciar la aplicacion:", error);
    process.exit(1);
  }
}

bootstrap();
