import express from "express";

import {
  createLinkController,
  deleteLinkController,
  linkIdController,
  seeAllLinksController,
  seeLinksTodayController,
  voteLinkController,
} from "../controllers/links/index.js";
import { validateAuth } from "../middlewares/index.js";

const router = express.Router();

//Ruta para crear un link:
router.post("/links", validateAuth, createLinkController);

//Rutas para ver los links:
router.get("/links", validateAuth, (req, res, next) => {
  const { today, previous } = req.query;
  //Las querys serán: /links?today=true
  if (today === "true") {
    seeLinksTodayController(req, res, next);
  } else {
    seeAllLinksController(req, res, next);
  }
});

// Ruta para borrar link
router.delete("/links/:linkId", validateAuth, deleteLinkController);
//Ruta para ver links con id
router.get("/links/:linkId", validateAuth, linkIdController);
//Ruta para votar un link:
router.post("/links/:linkId", validateAuth, voteLinkController);

export default router;
