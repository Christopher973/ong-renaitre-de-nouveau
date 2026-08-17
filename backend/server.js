require("dotenv").config();
const app = require("./app");
const { initDb } = require("./config/db");

const PORT = process.env.PORT || 3000;

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erreur d'initialisation de la base de données:", err);
    process.exit(1);
  });
