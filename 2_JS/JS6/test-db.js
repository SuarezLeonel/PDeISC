
import { readConfig, saveScore, getTopScores } from "./Modules/Database.js";

async function runTest() {
  console.log("1. Leyendo config...");
  const config = await readConfig();
  console.log("   Config leída:", JSON.stringify(config, null, 2));

  console.log("\n2. Probando guardar un score...");
  try {
    await saveScore({
      nombre: "TestUser",
      tiempo: "01:30",
      puntos: 150,
      fecha: new Date().toISOString()
    });
    console.log("   Score guardado correctamente!");
  } catch (error) {
    console.error("   ERROR al guardar score:", error);
  }

  console.log("\n3. Probando consultar scores...");
  try {
    const scores = await getTopScores(5);
    console.log("   Scores obtenidos:", scores);
  } catch (error) {
    console.error("   ERROR al consultar scores:", error);
  }
}

runTest()
  .then(() => {
    console.log("\n✅ Prueba finalizada!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Error en la prueba:", error);
    process.exit(1);
  });
