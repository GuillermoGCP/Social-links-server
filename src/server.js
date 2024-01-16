//Módulos:
import express from "express";
import "dotenv/config";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import path from "path";

//Importaciones propias:
import { manageError, notFound } from "./middlewares/index.js";
import { linkRouters, userRouters } from "./routes/index.js";

//Express:
const app = express();

//Middlewares de aplicación:
app.use(express.json());
app.use(cors());

// Middleware para servir archivos estáticos desde la carpeta "uploads":
const __dirname = process.cwd();
const ruta = join(__dirname, "src", "uploads");
app.use("/uploads", express.static(ruta));

//Rutas:
app.use(userRouters);
app.use(linkRouters);

//Middlewares
app.use(notFound);
app.use(manageError);

//Server:
app.listen(process.env.PORT, () => {
  console.log(`Servidor activo en el puerto ${process.env.PORT}`);
});
