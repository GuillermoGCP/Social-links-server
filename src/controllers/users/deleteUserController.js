import { deleteUser } from "../../models/users/index.js";
const deleteUserController = async (req, res, next) => {
  try {
    const loggedUserId = req.auth.id;
    await deleteUser(loggedUserId);
    res.send({
      status: "ok",
      message: "Cuenta eliminada",
    });
  } catch (error) {
    next(error);
  }
};

export default deleteUserController;
