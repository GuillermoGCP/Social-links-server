import { seeAllLinks } from "../../models/links/index.js";
const seeAllLinksController = async (req, res, next) => {
  try {
    const links = await seeAllLinks(req.auth?.id);

    if (!links) {
      res.send({
        status: "ok",
        data: {
          message: "No hay links compartidos",
        },
      });
      return;
    }
    res.send({
      status: "ok",
      data: {
        message: "Estos son todos los enlaces publicados",
        links: links,
      },
    });
  } catch (error) {
    next(error);
  }
};
export default seeAllLinksController;
