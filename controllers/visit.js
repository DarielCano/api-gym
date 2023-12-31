const Visit = require("../models/Visit");
const Report = require("../models/Report");

const path = require("path");
const xl = require("excel4node");
const { months } = require("../helpers/months.js");
const visitInfo = [
  ["Enero", 0],
  ["Febrero", 0],
  ["Marzo", 0],
  ["Abril", 0],
  ["Mayo", 0],
  ["Junio", 0],
  ["Julio", 0],
  ["Agosto", 0],
  ["Septiembre", 0],
  ["Octubre", 0],
  ["Noviembre", 0],
  ["Diciembre", 0],
];

const addVisitCant = async (month) => {
  const report = await Report.find({
    year: `${new Date().getFullYear()}`,
  }).exec();
  const visitMonth = visitInfo.map((m) =>
    m[0] == month ? [m[0], (m[1] = m[1] + 1)] : m
  );

  console.log(month);

  console.log(report);
  if (report.length === 0) {
    const newReport = new Report({
      priceVisit: "0",
      priceMonth: "0",
      year: `${new Date().getFullYear()}`,
      dataVisit: [...visitMonth],
      dataMonth: [],
    });
    newReport.save().then((resp) => {
      console.log(resp);
      return true;
    });
  } else {
    const resp1 = await Report.findOneAndUpdate(
      { year: `${new Date().getFullYear()}` },
      { dataVisit: [...visitMonth] }
    ).exec();

    console.log(resp1);
    return true;
  }
};

const addVisit = async (req, res) => {
  const today = new Date();
  const data = req.body;
  const thisMonth = months(today.getMonth());

  const query = await Visit.findOne({
    visitDate: `${
      today.getDate() <= 9 ? "0" + today.getDate() : today.getDate()
    }-${
      today.getMonth() + 1 <= 9
        ? "0" + (today.getMonth() + 1)
        : today.getMonth() + 1
    }-${today.getFullYear()}`,
  }).exec();

  /* verificar si existe documento del dia (verificar por fecha) */
  if (query === null) {
    const users = [
      {
        ...data,
        dateTime: `${
          today.getHours() <= 9 ? "0" + today.getHours() : today.getHours()
        }:${
          today.getMinutes() <= 9
            ? "0" + today.getMinutes()
            : today.getMinutes()
        }:${
          today.getSeconds() <= 9
            ? "0" + today.getSeconds()
            : today.getSeconds()
        }`,
      },
    ];
    const newVisit = new Visit({
      visitDate: `${
        today.getDate() <= 9 ? "0" + today.getDate() : today.getDate()
      }-${
        today.getMonth() + 1 <= 9
          ? "0" + (today.getMonth() + 1)
          : today.getMonth() + 1
      }-${today.getFullYear()}`,
      users,
    });

    await addVisitCant(thisMonth);

    newVisit.save().then((resp) => {
      return res.status(200).send({
        status: "success",
        message: "Usuario visitante agregado correctamente",
      });
    });
  } else {
    const userExist = query.users.find(
      (user) => user.name === data.name && user.surname === data.surname
    );

    if (userExist === undefined) {
      Visit.findOneAndUpdate(
        { _id: query._id },
        {
          users: [
            ...query.users,
            {
              ...data,
              dateTime: `${
                today.getHours() <= 9
                  ? "0" + today.getHours()
                  : today.getHours()
              }:${
                today.getMinutes() <= 9
                  ? "0" + today.getMinutes()
                  : today.getMinutes()
              }:${
                today.getSeconds() <= 9
                  ? "0" + today.getSeconds()
                  : today.getSeconds()
              }`,
            },
          ],
        },
        { new: true }
      )
        .then(() => {
          addVisitCant(thisMonth);
        })
        .then(() => {
          return res.status(200).send({
            status: "success",
            message: "Usuario visitante agregado correctamente",
          });
        });
    } else {
      return res.status(400).send({
        status: "error",
        message: "El usuario ya existe",
      });
    }
  }

  /*   */
};

const getAllVisit = (req, res) => {
  Visit.find({}).then((resp) => {
    res.status(200).send({
      status: "success",
      data: resp,
    });
  });
};

const exportVisit = async (req, res) => {
  const id = req.params.id;

  const query = await Visit.findById(id).exec();

  const userList = await query.users;

  const wb = new xl.Workbook();
  const ws = wb.addWorksheet(`Visitas`);

  const styleSubtitle = wb.createStyle({
    font: {
      color: "#FF0800",
      size: 16,
      name: "Calibri",
      bold: true,
    },
  });

  const styleContent = wb.createStyle({
    font: {
      color: "#000000",
      size: 12,
      name: "Calibri",
      italics: true,
    },
  });

  ws.cell(1, 1).string("Nombre").style(styleSubtitle);

  ws.cell(1, 2).string("Apellidos").style(styleSubtitle);

  ws.cell(1, 3).string("Hora").style(styleSubtitle);

  ws.cell(1, 4).string("Fecha").style(styleSubtitle);

  for (let i = 0; i < userList.length; i++) {
    j = 1;
    for (let v in userList[i]) {
      ws.cell(i + 2, j)
        .string(`${userList[i][v]}`)
        .style(styleContent);
      j++;
    }
  }

  for (let i = 0; i < userList.length; i++) {
    ws.cell(i + 2, 4)
      .string(`${query.visitDate}`)
      .style(styleContent);
  }

  ws.column(1).setWidth(40);
  ws.column(2).setWidth(40);
  const pathExcel = path.join(
    __dirname,
    "excel",
    `Visitas_${query.visitDate}.xlsx`
  );

  wb.write(pathExcel, function (err, stats) {
    if (err) console.log(err);
    else {
      function downloadFile() {
        res.download(pathExcel);
      }
      downloadFile();
      return false;
    }
  });
};

/////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////

module.exports = {
  addVisit,
  getAllVisit,
  exportVisit,
};
