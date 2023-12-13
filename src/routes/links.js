import express from "express";

import {
  createLinkController,
  deleteLinkController,
  linkIdController,
  previousLinksController,
  seeAllLinksController,
  seeLinksTodayController,
  voteLinkController,
} from "../controllers/links/index.js";
import { validateAuth } from "../middlewares/index.js";

const router = express.Router();

//Ruta para crear un link:
router.post("/links", validateAuth, createLinkController);

//Ruta para ver los links de hoy:
router.get("/links/today", validateAuth, seeLinksTodayController);
//Ruta para ver los links anteriores a hoy:
router.get("/links/previous", validateAuth, previousLinksController);
//Ruta para ver todos los links:
router.get("/links/all", validateAuth, seeAllLinksController);
// Ruta para borrar link
router.delete("/links/:linkId", validateAuth, deleteLinkController);
//Ruta para ver links con id
router.get("/links/:linkId", validateAuth, linkIdController);
//Ruta para votar un link:
router.post("/links/:linkId", validateAuth, voteLinkController);

export default router;
