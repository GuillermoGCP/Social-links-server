import express from "express";
import "dotenv/config";
const { PORT } = process.env;
const app = express();

app.use(express.json());

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
