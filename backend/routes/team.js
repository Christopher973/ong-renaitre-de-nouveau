const express = require("express");
const fs = require("fs");
const path = require("path");
const { pool } = require("../config/db");
const { auth } = require("../middleware/auth");
const { upload, UPLOAD_DIR } = require("../middleware/upload");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM team_members ORDER BY order_index ASC, created_at ASC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

router.post("/", auth, upload.single("photo"), async (req, res) => {
  const { name, role, team_group, bio, order_index } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;
  try {
    const [result] = await pool.query(
      "INSERT INTO team_members (name, role, team_group, photo, bio, order_index) VALUES (?,?,?,?,?,?)",
      [name, role, team_group || null, photo, bio || null, order_index || 0]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

router.put("/:id", auth, upload.single("photo"), async (req, res) => {
  const { name, role, team_group, bio, order_index, deletePhoto } = req.body;
  try {
    const [existing] = await pool.query("SELECT * FROM team_members WHERE id = ?", [req.params.id]);
    if (existing.length === 0) return res.status(404).json({ error: "Introuvable." });

    let photo = existing[0].photo;
    if (req.file) {
      if (photo) fs.unlink(path.join(UPLOAD_DIR, path.basename(photo)), () => {});
      photo = `/uploads/${req.file.filename}`;
    } else if (deletePhoto === "true") {
      if (photo) fs.unlink(path.join(UPLOAD_DIR, path.basename(photo)), () => {});
      photo = null;
    }

    await pool.query(
      "UPDATE team_members SET name=?, role=?, team_group=?, photo=?, bio=?, order_index=? WHERE id=?",
      [name, role, team_group || null, photo, bio || null, order_index || 0, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const [existing] = await pool.query("SELECT * FROM team_members WHERE id = ?", [req.params.id]);
    if (existing[0]?.photo) fs.unlink(path.join(UPLOAD_DIR, path.basename(existing[0].photo)), () => {});
    await pool.query("DELETE FROM team_members WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

module.exports = router;
