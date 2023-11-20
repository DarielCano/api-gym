const { sendMail } = require("../middleware/sendMails");
const User = require("../models/User");

const addUser = async (req, res) => {
  const userData = req.body;

  if (
    !userData.name ||
    !userData.surname ||
    !userData.phone ||
    !userData.address ||
    !userData.email
  ) {
    return res.status(400).json({
      status: "error",
      message: "Faltan datos por llenar",
    });
  }

  const query = await User.find({
    $or: [{ email: userData.email }, { phone: userData.phone }],
  }).exec();
  if (query && query.length > 1) {
    return res.status(500).send({
      status: "error",
      message: "El usuario ya existe",
    });
  }

  if (!userData.incomeDate) {
    const incomeDate = new Date();

    const nextMonth =
      incomeDate.getMonth() + 12 == 11 ? 1 : incomeDate.getMonth() + 2;

    const nextYear =
      incomeDate.getMonth() + 1 == 12
        ? incomeDate.getFullYear() + 1
        : incomeDate.getFullYear();

    const stringDate = `${nextYear}/${nextMonth}/${incomeDate.getDate()}`;
    const nextPay = new Date(stringDate);
    const newUser = new User({ ...userData, nextPay, incomeDate });
    newUser
      .save()
      .then((data) => {
        return res.status(200).json({ status: "success", user: data });
      })
      .catch((err) => {
        return res.status(400).send({
          status: "error",
          mensaje: "Ha ocurrido un error al guardar usuario:",
          err,
        });
      });
  } else {
    const incomeDate = new Date(userData.incomeDate);
    const today = new Date();
    const nextMonth = today.getMonth() + 12 == 11 ? 1 : today.getMonth() + 2;

    const nextYear =
      today.getMonth() + 1 == 12
        ? today.getFullYear() + 1
        : today.getFullYear();

    const stringDate = `${nextYear}/${nextMonth}/${incomeDate.getDate()}`;
    const nextPay = new Date(stringDate);
    const newUser = new User({ ...userData, nextPay, incomeDate });
    newUser
      .save()
      .then((data) => {
        return res.status(200).send({ status: "success", user: data });
      })
      .catch((err) => {
        return res.status(400).send({
          status: "error",
          mensaje: "Ha ocurrido un error al guardar usuario:",
          err,
        });
      });
  }
};

const getUsers = (req, res) => {
  User.find({})
    .then((data) => {
      return res.status(200).send({
        status: "success",
        message: "Datos cargados correctamente",
        data: data,
      });
    })

    .catch((err) => {
      return res.status(400).send({
        satus: "error",
        message: "Ha ocurrido un error: ",
        err,
      });
    });
};

const getUser = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then((data) => {
      res.status(200).send({
        status: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).send({
        status: "error",
        message: "Ha ocurrido un error al obtener el usuario: ",
        err,
      });
    });
};

const deleteUser = (req, res) => {
  const id = req.params.id;

  User.findByIdAndDelete(id)
    .then((data) => {
      res.status(200).send({
        status: "succes",
        message: "Usuario eliminado correctamente",
      });
    })
    .catch((err) => {
      return res.satus(400).send({
        status: "error",
        message: "Ha ocurrido un error: ",
        err,
      });
    });
};

const updateUser = (req, res) => {
  const userUpdate = req.body;
  const id = req.params.id;

  User.findOneAndUpdate({ _id: id }, userUpdate, { new: true })
    .then((data) => {
      res.status(200).send({
        status: "success",
        message: "Usuario actualizado correctamente",
        user: data,
      });
    })
    .catch((err) => {
      return res.status(400).send({
        status: "error",
        message: "Error al actualizar usuario: ",
        err,
      });
    });
};

const updateDate = (req, res) => {
  const id = req.params.id;

  const today = new Date();

  const nextMonth = today.getMonth() + 12 == 11 ? 1 : today.getMonth() + 2;

  const nextYear =
    today.getMonth() + 1 == 12 ? today.getFullYear() + 1 : today.getFullYear();

  const stringDate = `${nextYear}/${nextMonth}/${today.getDate()}`;
  const nextPay = new Date(stringDate);

  User.findOneAndUpdate({ _id: id }, { nextPay }, { new: true })
    .then((user) => {
      return res.status(200).send({
        status: "success",
        message: "Fecha de pago de usuario actualizada correctamente",
        user: user,
      });
    })
    .catch((err) => {
      return res.status(400).send({
        status: "error",
        message: "Ha ocurrido un error: ",
        err,
      });
    });
};

module.exports = {
  addUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  updateDate,
};