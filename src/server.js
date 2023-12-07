import express from "express";
import "dotenv/config";
const { PORT } = process.env;
const app = express();

//Server:
app.listen(PORT, () => {
  console.log(`Servidor activo en el puerto ${PORT}`);
});
