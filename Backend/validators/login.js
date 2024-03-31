const jwt = require("jsonwebtoken");
const { validationResult, body } = require("express-validator");

exports.runValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array()[0].msg);
    return res.status(422).json({ error: errors.array()[0].msg });
  }
  next();
};

exports.verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Acceso denegado" });
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    if (verified.date < Date.now() - 5 * 60 * 1000) {
      res.status(401).json({ error: "Token expirado" });
    }
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.isAdmin = (req, res, next) => {
  verifyToken();
  if (req.user.permisos === 1) {
    next();
  } else {
    res
      .status(403)
      .json({ error: "No tiene los permisos para realizar esta acción" });
  }
};

exports.correoValido = [
  body("correo")
    .exists()
    .withMessage("No hay usuario")
    .isEmail()
    .withMessage("No es un correo valido"),
];

exports.claveValido = [
  body("clave")
    .exists()
    .withMessage("No hay clave")
    .isLength({ min: 7, max: 15 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[0-9a-zA-Z\W_]{7,15}$/)
    .withMessage("No es una clave valida"),
];

exports.permisosValido = [
  body("permisos")
    .exists()
    .withMessage("No hay permisos")
    .isFloat({ min: 1, max: 3 })
    .isInt()
    .withMessage("El permiso tiene que ser un entero de valor 1, 2 o 3"),
];

exports.nombreValido = [
  body("nombre")
    .exists()
    .withMessage("No hay nombre")
    .isAlpha('en-US', { ignore: ' ' })
    .withMessage("El nombre solo puede contener caracteres Alpha")
];