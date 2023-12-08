import express from "express";
import "dotenv/config";
import useDb from "./db/useDb.js";
import cors from "cors";

// --------------------------------------
import login from "./controllers/users/login.js";

import pool from "./db/getPool.js";
// --------------------------------------

const { PORT } = process.env;
const app = express();

useDb();

app.use(express.json());

// Rutas de usuarios ---------------------
app.post("/login", login);
// ---------------------------------------

app.post("/links", async (req, res) => {
  const loggedUserId = req.auth.id;
  const { url, title, description } = req.body;
  const [insertId] = await pool.query(
    "INSERT INTO links (url, title, description, ownerId)VALUES(?, ?, ?, ?)",
    [url, title, description, loggedUserId]
  );
  res.send({
    status: "ok",
    data: {
      id: insertId,
    },
  });
});

//Server:
app.listen(PORT, () => {
  console.log(`Servidor activo en el puerto ${PORT}`);
});
