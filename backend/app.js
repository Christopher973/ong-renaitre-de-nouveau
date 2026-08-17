const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");
const newsRoutes = require("./routes/news");
const videosRoutes = require("./routes/videos");
const projectsRoutes = require("./routes/projects");
const teamRoutes = require("./routes/team");

const app = express();

app.use(cors());
app.use((req, res, next) => { res.set("Cache-Control", "no-store"); next(); });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/videos", videosRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/team", teamRoutes);

module.exports = app;
