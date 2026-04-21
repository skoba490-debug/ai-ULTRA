import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { initDB } from "./db";
import { healthRouter } from "./health";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// health
app.use("/health", healthRouter);

// 👉 твои API роуты (если есть)
// app.use("/api", ...);

// 👉 ВАЖНО: раздаём билд фронта (сохраняет фон/стили 1:1)
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, ".."); // dist/
  app.use(express.static(distPath));

  app.get("*", (_, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

const port = process.env.PORT || 3000;

async function start() {
  try {
    if (process.env.DATABASE_URL) {
      await initDB();
    }

    app.listen(port, () => {
      console.log("✅ Server running on", port);
    });
  } catch (e) {
    console.error("❌ Start error:", e);
    process.exit(1);
  }
}

start();
