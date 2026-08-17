const express = require("express");
const fs = require("fs");
const path = require("path");
const { pool } = require("../config/db");
const { auth } = require("../middleware/auth");
const { upload, UPLOAD_DIR } = require("../middleware/upload");
const router = express.Router();

// GET /api/news — liste publique (avec toutes les images)
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM news WHERE published = 1 ORDER BY created_at DESC");
    const [images] = await pool.query("SELECT * FROM news_images ORDER BY order_index ASC");
    const withImages = rows.map((n) => ({
      ...n,
      images: images.filter((img) => img.news_id === n.id).map((img) => img.image),
    }));
    res.json(withImages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

// POST /api/news — création (admin), plusieurs images possibles
router.post("/", auth, upload.array("images", 10), async (req, res) => {
  const { title, content, published } = req.body;
  const files = req.files || [];
  const coverImage = files.length > 0 ? `/uploads/${files[0].filename}` : null;
  try {
    const [result] = await pool.query(
      "INSERT INTO news (title, content, image, published) VALUES (?,?,?,?)",
      [title, content, coverImage, published === "false" ? 0 : 1]
    );
    const newsId = result.insertId;
    for (let i = 0; i < files.length; i++) {
      await pool.query(
        "INSERT INTO news_images (news_id, image, order_index) VALUES (?,?,?)",
        [newsId, `/uploads/${files[i].filename}`, i]
      );
    }
    res.status(201).json({ id: newsId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

// PUT /api/news/:id — modification (admin), remplace les images si nouvelles fournies
router.put("/:id", auth, upload.array("images", 10), async (req, res) => {
  const { title, content, published, deleteImage } = req.body;
  const files = req.files || [];
  try {
    const [existing] = await pool.query("SELECT * FROM news WHERE id = ?", [req.params.id]);
    if (existing.length === 0) return res.status(404).json({ error: "Introuvable." });

    let coverImage = existing[0].image;

    if (files.length > 0) {
      const [oldImages] = await pool.query("SELECT * FROM news_images WHERE news_id = ?", [req.params.id]);
      oldImages.forEach((img) => fs.unlink(path.join(UPLOAD_DIR, path.basename(img.image)), () => {}));
      if (coverImage) fs.unlink(path.join(UPLOAD_DIR, path.basename(coverImage)), () => {});
      await pool.query("DELETE FROM news_images WHERE news_id = ?", [req.params.id]);

      coverImage = `/uploads/${files[0].filename}`;
      for (let i = 0; i < files.length; i++) {
        await pool.query(
          "INSERT INTO news_images (news_id, image, order_index) VALUES (?,?,?)",
          [req.params.id, `/uploads/${files[i].filename}`, i]
        );
      }
    } else if (deleteImage === "true") {
      const [oldImages] = await pool.query("SELECT * FROM news_images WHERE news_id = ?", [req.params.id]);
      oldImages.forEach((img) => fs.unlink(path.join(UPLOAD_DIR, path.basename(img.image)), () => {}));
      if (coverImage) fs.unlink(path.join(UPLOAD_DIR, path.basename(coverImage)), () => {});
      await pool.query("DELETE FROM news_images WHERE news_id = ?", [req.params.id]);
      coverImage = null;
    }

    await pool.query(
      "UPDATE news SET title=?, content=?, image=?, published=? WHERE id=?",
      [title, content, coverImage, published === "false" ? 0 : 1, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

// DELETE /api/news/:id — suppression (admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    const [images] = await pool.query("SELECT * FROM news_images WHERE news_id = ?", [req.params.id]);
    images.forEach((img) => fs.unlink(path.join(UPLOAD_DIR, path.basename(img.image)), () => {}));
    const [existing] = await pool.query("SELECT * FROM news WHERE id = ?", [req.params.id]);
    if (existing[0]?.image) fs.unlink(path.join(UPLOAD_DIR, path.basename(existing[0].image)), () => {});
    await pool.query("DELETE FROM news WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

module.exports = router;
