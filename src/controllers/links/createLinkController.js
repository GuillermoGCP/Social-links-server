import { createLink } from "../../models/links/index.js";

const createLinkController = async (req, res) => {
  const loggedUserId = req.auth.id;
  const { url, title, description } = req.body;
  const insertId = await createLink(url, title, description, loggedUserId);

  res.send({
    status: "ok",
    data: {
      id: insertId,
      message: "Has compartido un enlace!👌",
    },
  });
};

export default createLinkController;
