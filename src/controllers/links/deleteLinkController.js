import { deleteLink, selectLinkById } from "../../models/links/index.js";
import { generateError } from "../../utils/index.js";

const deleteLinkController = async (req, res, next) => {
  try {
    const loggedUserId = req.auth.id;
    const { linkId } = req.params;

    const link = await selectLinkById(linkId);

    if (!link) {
      generateError("El link no existe", 404);
    }

    if (link.ownerId !== loggedUserId) {
      generateError("No eres el creador de este link", 403);
    }
    await deleteLink(linkId);
    res.send({
      status: "ok",
      message: "El link se ha borrado",
      link,
    });
  } catch (error) {
    next(error);
  }
};

export default deleteLinkController;
