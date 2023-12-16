import { seeAllLinks } from "../../models/links/index.js";
const seeAllLinksController = async (req, res, next) => {
  try {
    const links = await seeAllLinks();
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
        links,
      },
    });
    console.log(links);
  } catch (error) {
    next(error);
  }
};
export default seeAllLinksController;
