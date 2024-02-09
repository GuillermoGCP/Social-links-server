import express from "express";
import { validateAuth } from "../middlewares/index.js";
import {
  createCommentController,
  getCommentsController,
} from "../controllers/comments/index.js";

const router = express.Router();

//Ruta para crear un comentario:
router.post("/comments", validateAuth, createCommentController);

//Ruta para traer todos los comentarios:
router.post("/comments/get", validateAuth, getCommentsController);

export default router;
