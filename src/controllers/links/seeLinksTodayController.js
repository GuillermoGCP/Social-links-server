import { seeLinksToday } from "../../models/links/index.js";

const seeLinksTodayController = async (req, res, next) => {
  try {
    const links = await seeLinksToday();
    if (!links) {
      res.send({
        status: "ok",
        data: {
          message: "No hay links compartidos hoy",
        },
      });
      return;
    }
    res.send({
      status: "ok",
      data: {
        message: "Estos son todos los enlaces de hoy",
        links,
      },
    });
  } catch (error) {
    next(error);
  }
};
export default seeLinksTodayController;
