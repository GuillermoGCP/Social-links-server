import express from "express";
import { validateAuth } from "../middlewares/index.js";
import {
  createCommentController,
  getCommentsController,
  responseToAComent,
} from "../controllers/comments/index.js";

const router = express.Router();

//Ruta para crear un comentario:
router.post("/comments", validateAuth, createCommentController);

//Ruta para responder a un comentario:
router.post("/comments/response", validateAuth, responseToAComent);

//Ruta para traer los comentarios por id del link:
router.get("/comments/:linkId", validateAuth, getCommentsController);

export default router;
