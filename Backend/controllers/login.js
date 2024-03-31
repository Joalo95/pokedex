const knex = require("../knexfile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  let { nombre, correo, clave, permisos } = req.body;
  permisos = Number(permisos);
  const salt = bcrypt.genSaltSync(12);
  const passHash = bcrypt.hashSync(clave, salt);
  await knex("Usuarios")
    .max("id")
    .then(function (datos) {
      knex("Usuarios")
        .select("*")
        .where("correo", correo)
        .then(function (data) {
          console.log(data);
          if (data.length != 0) {
            res.status(400).json({ error: "Usuario ya registrado" });
          } else {
            knex("Usuarios")
              .insert({
                id: datos[0].max + 1,
                nombre: nombre,
                correo: correo,
                clave: passHash,
                permisos: permisos,
              })
              .then(function (data) {
                res.status(201).send(data);
              });
          }
        });
    });
};

exports.login = async (req, res) => {
  const { correo, clave } = req.body;
  console.log(req.body);
  await knex("Usuarios")
    .select("*")
    .where("correo", correo)
    .then(function (data) {
      if (data.length != 1) {
        res.status(400).json({ error: "Usuario no existe o es incorrecto" });
      }
      const user = data[0];
      console.log(data)
      const validPassword = bcrypt.compareSync(clave, user.clave);
      if (validPassword) {
        const token = jwt.sign(
          {
            correo: user.correo,
            nombre: user.nombre,
            permisos: user.permisos,
            date: Date.now(),
          },
          process.env.TOKEN_SECRET
        );
        res.status(200).json({ error: null, data: "Login exitoso", token });
      } else {
        return res
          .status(400)
          .json({ error: "No se puede procesar su solicitud, intente en un momento" });
      }
    });
};
