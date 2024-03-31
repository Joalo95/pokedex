const express = require("express");
const path = require('path');
const router = express.Router();
const { mostrarPokemones, mostrarPokemonId, addPokemon, updatePokemon, deletePokemon } = require("../controllers/pokedex");
const { pokemonHeightValido, pokemonWeightValido, pokemonTipoValido, pokemonAtkValido, pokemonDefValido, pokemonSpdValido, pokemonSatkValido, pokemonSdefValido, pokemonHpValido, pokemonIdValido, pokemonNombreValido, imagenExiste, imagenNoExiste } = require("../validators/middleware");
const { runValidate, isAdmin, verifyToken } = require("../validators/login")

//Multer
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "Uploading"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

//Routes Pokemones
router.get("/pokedex", mostrarPokemones);
router.post("/pokemon/nuevo", upload.single('Imagen'), verifyToken, isAdmin, imagenNoExiste, pokemonNombreValido, pokemonIdValido, pokemonHpValido, pokemonAtkValido, pokemonDefValido, pokemonSpdValido, pokemonSatkValido, pokemonSdefValido, pokemonHeightValido, pokemonWeightValido, runValidate, pokemonTipoValido, addPokemon);
router.put("/pokemon/editar", upload.single('Imagen'), verifyToken, isAdmin, imagenExiste, pokemonNombreValido, pokemonIdValido, pokemonHpValido, pokemonAtkValido, pokemonDefValido, pokemonSpdValido, pokemonSatkValido, pokemonSdefValido, pokemonHeightValido, pokemonWeightValido, runValidate, pokemonTipoValido, updatePokemon);
router.get("/pokedex/:id", mostrarPokemonId);
router.delete("/pokemon/eliminar/:id", deletePokemon);

module.exports = router;