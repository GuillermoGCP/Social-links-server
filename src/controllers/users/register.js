import bcrypt from "bcrypt";

// Register
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validar con joi...??

    const userWithSameEmail = await selectUserByEmail(email);

    if (userWithSameEmail) {
      // generar error
      return res
        .status(400)
        .send("Ya existe un usuario con este mail, listo!!!", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertId = await insertser({
      name,
      email,
      hashedPassword,
    });

    res.status(201).send({
      message: "Registro completado con éxito Máquina!",
      data: { id: insertId, nombre: name, email },
    });
  } catch (error) {
    // next(error);
    console.error("La cagaste Burt Lancaster!");
  }
};

export default register;
