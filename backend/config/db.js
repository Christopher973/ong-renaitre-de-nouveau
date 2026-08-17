const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const waitForDb = async (retries = 15) => {
  for (let i = 0; i < retries; i++) {
    try {
      const conn = await pool.getConnection();
      conn.release();
      console.log("✅ Connecté à MySQL !");
      return;
    } catch (err) {
      console.log(`⏳ MySQL non prêt (tentative ${i + 1}/${retries})…`);
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
  throw new Error("Impossible de se connecter à MySQL.");
};

const initDb = async () => {
  await waitForDb();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS admins (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(160) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS news (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      content TEXT NOT NULL,
      image VARCHAR(255) NULL,
      published BOOLEAN DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS videos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      youtube_url VARCHAR(255) NOT NULL,
      description TEXT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS project_updates (
      id INT AUTO_INCREMENT PRIMARY KEY,
      project_name VARCHAR(150) NOT NULL,
      title VARCHAR(200) NOT NULL,
      content TEXT NOT NULL,
      image VARCHAR(255) NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS team_members (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      role VARCHAR(150) NOT NULL,
      photo VARCHAR(255) NULL,
      bio TEXT NULL,
      order_index INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS zones (
      id INT AUTO_INCREMENT PRIMARY KEY,
      country VARCHAR(100) NOT NULL,
      prepositional_phrase VARCHAR(100) NOT NULL,
      city VARCHAR(150) NULL,
      address VARCHAR(255) NOT NULL,
      description TEXT NULL,
      map_url TEXT NOT NULL,
      order_index INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  const [zoneCount] = await pool.query("SELECT COUNT(*) AS n FROM zones");
  if (zoneCount[0].n === 0) {
    await pool.query(
      "INSERT INTO zones (country, prepositional_phrase, city, address, description, map_url, order_index) VALUES (?,?,?,?,?,?,?)",
      [
        "France",
        "en France",
        "Strasbourg",
        "24 rue de la Niederbourg, 67400 Illkirch-Graffenstaden",
        "Siège de l'association et coordination des actions en Europe",
        "https://www.google.com/maps?q=" +
          encodeURIComponent("24 rue de la Niederbourg, 67400 Illkirch-Graffenstaden") +
          "&output=embed",
        0,
      ]
    );
    await pool.query(
      "INSERT INTO zones (country, prepositional_phrase, city, address, description, map_url, order_index) VALUES (?,?,?,?,?,?,?)",
      [
        "Bénin",
        "au Bénin",
        "Multi-départements",
        "Alibori, Borgou, Atacora, Mono, Couffo, Plateau",
        "Actions terrain dans 6 départements du Bénin",
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4069925.25!2d0.9900!3d9.3077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1023cd5c7b7e5b7b%3A0x5b5b5b5b5b5b5b5b!2sBenin!5e0!3m2!1sfr!2sfr!4v1234567890",
        1,
      ]
    );
    console.log("🌍 Zones d'intervention initiales créées (France, Bénin).");
  }

  const [rows] = await pool.query("SELECT COUNT(*) AS n FROM admins");
  if (rows[0].n === 0) {
    const email = process.env.ADMIN_EMAIL || "admin@renaitredenouveau.org";
    const pass = process.env.ADMIN_PASSWORD || "changeme2026";
    const hash = await bcrypt.hash(pass, 10);
    await pool.query("INSERT INTO admins (name, email, password) VALUES (?,?,?)", [
      "Administrateur",
      email,
      hash,
    ]);
    console.log(`🔑 Admin par défaut créé : ${email} / ${pass}`);
  }

  console.log("🚀 Base de données initialisée.");
};

module.exports = { pool, initDb };
