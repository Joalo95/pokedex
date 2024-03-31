const express = require("express");
const router = express.Router();

const { register, login } = require('../controllers/login');
const { runValidate, nombreValido, claveValido, permisosValido, correoValido } = require('../validators/login');

router.post("/register", nombreValido, correoValido, claveValido, permisosValido, runValidate, register);
router.post("/login", login);

module.exports = router