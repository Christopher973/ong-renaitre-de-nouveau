const express = require("express");
const { pool } = require("../config/db");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM videos ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

router.post("/", auth, async (req, res) => {
  const { title, youtube_url, description } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO videos (title, youtube_url, description) VALUES (?,?,?)",
      [title, youtube_url, description || null]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

router.put("/:id", auth, async (req, res) => {
  const { title, youtube_url, description } = req.body;
  try {
    await pool.query(
      "UPDATE videos SET title=?, youtube_url=?, description=? WHERE id=?",
      [title, youtube_url, description || null, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await pool.query("DELETE FROM videos WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

module.exports = router;
