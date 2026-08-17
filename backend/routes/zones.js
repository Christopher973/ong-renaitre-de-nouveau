const express = require("express");
const { pool } = require("../config/db");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM zones ORDER BY order_index ASC, created_at ASC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

router.post("/", auth, async (req, res) => {
  const { country, prepositional_phrase, city, address, description, map_url, order_index } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO zones (country, prepositional_phrase, city, address, description, map_url, order_index) VALUES (?,?,?,?,?,?,?)",
      [country, prepositional_phrase, city || null, address, description || null, map_url, order_index || 0]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

router.put("/:id", auth, async (req, res) => {
  const { country, prepositional_phrase, city, address, description, map_url, order_index } = req.body;
  try {
    await pool.query(
      "UPDATE zones SET country=?, prepositional_phrase=?, city=?, address=?, description=?, map_url=?, order_index=? WHERE id=?",
      [country, prepositional_phrase, city || null, address, description || null, map_url, order_index || 0, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await pool.query("DELETE FROM zones WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

module.exports = router;
