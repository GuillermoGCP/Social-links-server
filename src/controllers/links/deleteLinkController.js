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
      data: {
        id: link.id,
        message: "El link se ha borrado",
      },

    });
  } catch (error) {
    next(error);
  }
};

export default deleteLinkController;
