const express = require("express");
const fs = require("fs");
const path = require("path");
const { pool } = require("../config/db");
const { auth } = require("../middleware/auth");
const { upload, UPLOAD_DIR } = require("../middleware/upload");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM project_updates ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

router.post("/", auth, upload.single("image"), async (req, res) => {
  const { project_name, title, content } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;
  try {
    const [result] = await pool.query(
      "INSERT INTO project_updates (project_name, title, content, image) VALUES (?,?,?,?)",
      [project_name, title, content, image]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

router.put("/:id", auth, upload.single("image"), async (req, res) => {
  const { project_name, title, content, deleteImage } = req.body;
  try {
    const [existing] = await pool.query("SELECT * FROM project_updates WHERE id = ?", [req.params.id]);
    if (existing.length === 0) return res.status(404).json({ error: "Introuvable." });

    let image = existing[0].image;
    if (req.file) {
      if (image) fs.unlink(path.join(UPLOAD_DIR, path.basename(image)), () => {});
      image = `/uploads/${req.file.filename}`;
    } else if (deleteImage === "true") {
      if (image) fs.unlink(path.join(UPLOAD_DIR, path.basename(image)), () => {});
      image = null;
    }

    await pool.query(
      "UPDATE project_updates SET project_name=?, title=?, content=?, image=? WHERE id=?",
      [project_name, title, content, image, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const [existing] = await pool.query("SELECT * FROM project_updates WHERE id = ?", [req.params.id]);
    if (existing[0]?.image) fs.unlink(path.join(UPLOAD_DIR, path.basename(existing[0].image)), () => {});
    await pool.query("DELETE FROM project_updates WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

module.exports = router;
