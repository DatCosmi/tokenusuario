const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const fileUpload = require("express-fileupload");
var jwt = require("jsonwebtoken");

const app = express();
const port = 5000;
const saltRounds = 10;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "tutorias",
  password: "",
});

app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

app.get("/", function (req, res) {
  // res.send("ola");
  bcrypt.hash("si", saltRounds, function (err, hash) {
    res.send(hash);
  });
});

app.post("/alumnos/agregar", (req, res) => {
  const { matricula, nombre, tipo, password } = req.body;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    const sql = "insert into alumnos2 values (?,?,?,?)";

    db.query(sql, [matricula, nombre, tipo, hash], (err, result) => {
      if (err) {
        res.send({
          status: 100,
          errNo: err.errno,
          mensaje: err.message,
          codigo: err.code,
        });
      } else {
        res.send({
          status: 200,
          errNo: false,
          mensaje: "registro agregado",
          codigo: result.affectedRows,
        });
      }
    });
  });
});

app.post("/alumnos/acceder", (req, res) => {
  const { matricula, password } = req.body;
  const sql = "select * from alumnos2 where matricula=?";
  db.query(sql, [matricula], (err, result) => {
    if (result.length) {
      //se encontró matricula
      bcrypt.compare(password, result[0].password, (err1, result1) => {
        if (result1) {
          //si coincide login y pass
          var token = jwt.sign(
            {
              matricula: result[0].matricula,
              nombre: result[0].nombre,
              tipo: result[0].tipo,
            },
            "daguito1010",
            {
              expiresIn: "1h",
            }
          );

          res.send({
            status: 200,
            resultado: token,
            auth: true,
            result: result,
          });
        } else {
          //no coincide password
          res.send({
            status: 100,
            resultado: { mensaje: "Password incorrecto" },
            auth: false,
            result: result,
          });
        }
      });
    } else {
      //no se encontró matricula
      res.send({
        status: 403,
        resultado: { mensaje: "Matricula no encontrada" },
        auth: false,
        result: result,
      });
    }
  });
});

app.use("/ingresar", (req, res) => {
  res.send({
    token: "test123",
  });
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send({
      status: 403,
      resultado: { mensaje: "No se encontró token" },
    });
  } else {
    jwt.verify(token, "daguito1010", (err, decoded) => {
      if (err) {
        res.send({
          status: 402,
          resultado: { mensaje: "Falló la autentificación" },
          error: err,
        });
      } else {
        req.userMatricula = decoded.matricula;
        req.tipo = decoded.tipo;
        next();
      }
    });
  }
};

app.get("/alumnos/isAuth", verifyJWT, (req, res) => {
  res.send({
    mensaje: "Estás autentificado",
    idAlumno: req.userMatricula,
    tipoAlumno: req.tipo,
  });
});

app.get("/alumnos/calificaciones/:matricula", verifyJWT, (req, res) => {
  const tipoUsuario = req.tipo;

  if (tipoUsuario === "alumno") {
    const idAlumno = req.userMatricula;

    db.query(
      "SELECT * FROM calificaciones WHERE matricula = ?",
      [idAlumno],
      function (err, results, fields) {
        res.send({
          status: 200,
          resultado: results,
          error: err,
        });
      }
    );
  } else {
    res.send({
      status: 402,
      resultado: { mensaje: "No eres alumno" },
      error: err,
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor ejecutandose en http://localhost:${port}/`);
});
