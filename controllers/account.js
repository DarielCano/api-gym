const Account = require("../models/Account");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const data = req.body;

  const user = await Account.findOne({ nickname: data.nickname });

  if (!user || user.length == 0) {
    return res.status(500).send({
      status: "error",
      message: "El usuario no existe",
    });
  }

  if (user.role != data.role) {
    return res.status(500).send({
      status: "error",
      message: "El usuario no existe",
    });
  }

  let pwd = await bcrypt.compareSync(data.password, user.password);

  if (pwd) {
    return res.status(200).send({
      status: "success",
      user: user,
    });
  }

  return res.status(500).send({
    status: "error",
    message: "Las contraseñas no coinciden",
  });
};

const register = async (req, res) => {
  let data = req.body;

  const isAdmin = await Account.find({ role: "admin" }).exec();

  if (isAdmin.length > 1 && data.role == "admin") {
    return res.status(500).send({
      status: "error",
      message:
        " No puede registrarse más de un usuario como Administrador, solo con permiso del propio administrador",
    });
  }

  const users = await Account.find({
    $or: [{ email: data.email }, { nickname: data.nickname }],
  }).exec();

  if (users && users.length > 0) {
    return res.status(500).send({
      status: "error",
      message: "El usuario ya existe",
    });
  }

  let userTOSave = new Account(data);

  const pwd = await bcrypt.hash(data.password, 10);
  userTOSave.password = pwd;

  userTOSave
    .save()
    .then((resp) =>
      res.status(200).send({
        status: "success",
        message: "usuario registrado correctamente",
      })
    )
    .catch((err) =>
      res.status(500).send({
        status: "error",
        message: "Error al guardar usuario:",
        err,
      })
    );
};

const getAccountUsers = async (req, res) => {
  const usersAccount = await Account.find({}).exec();

  return res.status(200).send({
    status: "success",
    data: usersAccount,
  });
};

const editAccountRoles = async (req, res) => {
  const userRole = req.body;

  const newUser = await Account.findByIdAndUpdate(userRole._id, {
    role: userRole.role,
  });

  return res.status(200).send({
    status: "success",
    message: "Cuenta actualizada",
  });
};

module.exports = {
  login,
  register,
  getAccountUsers,
  editAccountRoles,
};
