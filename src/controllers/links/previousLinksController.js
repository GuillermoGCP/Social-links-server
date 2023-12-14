import { previousLinks } from "../../models/links/index.js";

const previousLinksController = async (req, res, next) => {
  try {
    const links = await previousLinks();
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
        message: "Estos son todos los enlaces anteriores",
        links,
      },
    });
  } catch (error) {
    next(error);
  }
};
export default previousLinksController;
