/**
 * Módulo de conexión y operaciones con la base de datos MySQL.
 * - Manejo de pool de conexiones para rendimiento
 * - Funciones para guardar y consultar scores
 * - Carga de configuración desde config.json
 */
import mysql from "mysql2/promise";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDirectory = path.resolve(__dirname, "..");
const configPath = path.join(rootDirectory, "config.json");

/* Pool de conexiones reutilizable para evitar overhead */
let pool;

/**
 * Lee y parsea la configuración general del proyecto.
 * @returns {Promise<{ server: { port: number }, database: Record<string, string | number> }>}
 */
export async function readConfig() {
  const rawConfig = await fs.readFile(configPath, "utf8");
  return JSON.parse(rawConfig);
}

/**
 * Crea o reutiliza un pool de conexiones MySQL.
 * @returns {Promise<mysql.Pool>}
 */
export async function getDbPool() {
  if (pool) {
    return pool;
  }

  const { database } = await readConfig();
  pool = mysql.createPool({
    host: database.host,
    port: Number(database.port),
    user: String(database.user),
    password: String(database.password),
    database: String(database.database),
    connectionLimit: Number(database.connectionLimit ?? 10),
    waitForConnections: true,
    queueLimit: 0
  });

  return pool;
}

/**
 * Garantiza que la tabla de score exista antes de operar.
 * @returns {Promise<void>}
 */
export async function ensureScoreTable() {
  const dbPool = await getDbPool();
  await dbPool.execute(`
    CREATE TABLE IF NOT EXISTS score (
      id INT AUTO_INCREMENT PRIMARY KEY,
      tiempo VARCHAR(50) NOT NULL,
      puntos INT NOT NULL,
      fecha DATETIME NOT NULL,
      nombre VARCHAR(120) NOT NULL
    )
  `);
}

/**
 * Inserta un score validado en la base de datos.
 * @param {{ tiempo: string, puntos: number, fecha: string, nombre: string }} payload
 * @returns {Promise<void>}
 */
export async function saveScore(payload) {
  const dbPool = await getDbPool();

  // Convertir fecha ISO UTC a formato compatible con MySQL DATETIME: YYYY-MM-DD HH:MM:SS
  const date = new Date(payload.fecha);
  const mysqlDate = date.toISOString().slice(0, 19).replace("T", " ");

  await dbPool.execute(
    "INSERT INTO score (tiempo, puntos, fecha, nombre) VALUES (?, ?, ?, ?)",
    [payload.tiempo, payload.puntos, mysqlDate, payload.nombre]
  );
}

/**
 * Obtiene la tabla de posiciones ordenada por puntaje y tiempo.
 * @param {number} limit
 * @returns {Promise<Array<{ id: number, tiempo: string, puntos: number, fecha: string, nombre: string }>>}
 */
export async function getTopScores(limit = 10) {
  const dbPool = await getDbPool();
  // Usamos query() en lugar de execute() para evitar problemas con LIMIT y parámetros numéricos en MySQL2
  const [rows] = await dbPool.query(
    `
      SELECT id, tiempo, puntos, fecha, nombre
      FROM score
      ORDER BY puntos DESC, tiempo ASC, fecha DESC
      LIMIT ?
    `,
    [Math.max(1, Math.floor(Number(limit)))]
  );

  return /** @type {Array<{ id: number, tiempo: string, puntos: number, fecha: string, nombre: string }>} */ (rows);
}
