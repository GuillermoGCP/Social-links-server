import { selectLinkById } from "../../models/links/index.js";
import { generateError } from "../../utils/index.js";

const linkIdController = async (req, res, next) => {
  try {
    const { linkId } = req.params;
    const links = await selectLinkById(linkId);
    if (!links) {
      generateError("El link no existe", 404);
    }
    res.send({
      status: "ok",
      data: {
        links,
      },
    });
  } catch (error) {
    next(error);
  }
};
export default linkIdController;
