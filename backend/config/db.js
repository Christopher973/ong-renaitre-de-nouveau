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
