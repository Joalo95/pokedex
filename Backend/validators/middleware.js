const { body } = require("express-validator");
const { esTipo } = require("../Utilities/Utilities");
var fs = require("fs");
const path = require('path');
const cors = require("cors");

const ACCEPTED_ORIGINS = [
  "http://127.0.0.1:3001",
  "http://127.0.0.1:5173"
]

/* exports.reparseFormToBody = (req, res, next) => {
  req.body = JSON.parse(req.body.Pokemon)
  next()
}; */

exports.corsMiddleware = ({ aceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (aceptedOrigins.includes(origin)) {
      return callback(null, true)
    }
    if (!origin) {
      return callback(null, true)
    }
    return callback(new Error('Not allowed by CORS'))
  }
});

exports.imagenNoExiste = (req, res, next) => {
  //FormData no acepta JSON, por eso viene string y hay que hacerle parse
  const id = req.body.id;
  let filePath = path.join(__dirname, "..", "Imagenes") + id;
  //Se fija si existe la imagen en la carpeta imagenes
  if (fs.existsSync(filePath + ".png") || fs.existsSync(filePath + ".jpg")) {
    res.status(400).json({
      error:
        "Ya existe una imagen para ese pokemon y por ende, el pokemon ya existe",
    });
    //Si existe la imagen se borra de la carpeta uploading
    fs.unlink(path.join(__dirname, "..", "Uploading") + req.file.originalname, (err) => {
      if (err) console.log(err);
      else {
        console.log("\nDeleted file: example_file.txt");
      }
    });
  }
  next();
};

exports.imagenExiste = (req, res, next) => {
  const id = req.body.idViejo;
  let filePath = path.join(__dirname, "..", "Imagenes") + id;
  if (!fs.existsSync(filePath + ".png") || !fs.existsSync(filePath + ".jpg")) {
    res.status(404).json({ error: "No existe la imagen y por ende el pokemon no existe" })
    console.log("Aqui 2")
    //Si existe la imagen se borra de la carpeta uploading
    fs.unlink(path.join(__dirname, "..", "Uploading") + req.file.originalname, (err => {
      if (err) console.log(err);
      else {
        console.log("\nDeleted file: example_file.txt");
      }
    })
    )
  }
  next()
};

exports.pokemonTipoValido = (req, res, next) => {
  const { tipo1, tipo2 } = req.body;
  if (!esTipo(tipo1) || (tipo2 && !esTipo(tipo2))) {
    res.status(400).send("Tipos invalidos");
  }
  next();
};

exports.pokemonNombreValido = [
  body("nombre")
    .exists()
    .withMessage("No hay nombre")
    .isAlpha()
    .withMessage("Los nombres solo pueden contener letras")
    .isLength({ min: 1, max: 15 })
    .withMessage("Nombre muy largo"),
];

//Needs testing
exports.pokemonHeightValido = [
  body("height")
    .exists()
    .withMessage("No hay height")
    .matches(/^[0-9]+[,]+[0-9]+[m]$/g)
    .withMessage(
      "Height tiene que ser un numero positivo hasta 2000 y terminar en m"
    ),
];

//Needs testing
exports.pokemonWeightValido = [
  body("weight")
    .exists()
    .withMessage("No hay weight")
    .matches(/^[0-9]+[,]+[0-9]+[k]+[g]$/g)
    .withMessage(
      "Weight tiene que ser un numero positivo hasta 2000 y terminar en kg"
    ),
];

exports.pokemonIdValido = [
  body("id")
    .exists()
    .withMessage("No hay id")
    .isInt({ min: 0, max: 1300, allow_leading_zeroes: false })
    .withMessage("La id tiene que ser numerica entre 0 y 1300"),
];

exports.pokemonHpValido = [
  body("stats.hp")
    .exists()
    .withMessage("No hay HP")
    .isInt({ min: 1, max: 255 })
    .withMessage("Los HP tienen que ser un entero entre 1 y 255"),
];

exports.pokemonAtkValido = [
  body("stats.atk")
    .exists()
    .withMessage("No hay atk")
    .isInt({ min: 1, max: 255 })
    .withMessage("El atk tiene que ser un entero entre 1 y 255"),
];

exports.pokemonDefValido = [
  body("stats.def")
    .exists()
    .withMessage("No hay def")
    .isInt({ min: 1, max: 255 })
    .withMessage("La def tiene que ser un entero entre 1 y 255"),
];

exports.pokemonSatkValido = [
  body("stats.satk")
    .exists()
    .withMessage("No hay satk")
    .isInt({ min: 1, max: 255 })
    .withMessage("El satk tiene que ser un entero entre 1 y 255"),
];

exports.pokemonSdefValido = [
  body("stats.sdef")
    .exists()
    .withMessage("No hay sdef")
    .isInt({ min: 1, max: 255 })
    .withMessage("La sdef tiene que ser un entero entre 1 y 255"),
];

exports.pokemonSpdValido = [
  body("stats.spd")
    .exists()
    .withMessage("No hay spd")
    .isInt({ min: 1, max: 255 })
    .withMessage("La spd tiene que ser un entero entre 1 y 255"),
];
