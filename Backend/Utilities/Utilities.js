var fs = require('fs');
const path = require('path');

const tiposValidos = new Set([
    "Grass", "Poison", "Electric", "Normal", "Ghost",
    "Dragon", "Fire", "Water", "Steel", "Fighting",
    "Rock", "Ground", "Flying", "Psychic", "Ice",
    "Dark", "Bug", "Fairy"
]);

exports.esTipo = (tipo) => {
    return tiposValidos.has(tipo);
};

const tipoANumeroMap = {
    "Normal": 1,
    "Rock": 2,
    "Ghost": 3,
    "Steel": 4,
    "Water": 5,
    "Fighting": 6,
    "Flying": 7,
    "Poison": 8,
    "Fairy": 9,
    "Dragon": 10,
    "Dark": 11,
    "Electric": 12,
    "Grass": 13,
    "Fire": 14,
    "Ice": 15,
    "Psychic": 16,
    "Bug": 17,
    "Ground": 18
};

exports.tipoANumero = (tipo) => {
    return tipoANumeroMap[tipo] || 0;
};

exports.moverImagen = async (req) => {
    //Mueve la imagen de la carpeta uploading con en nombre que le da el usuario
    // a la carpeta Imagenes con el nombre pokemonid.extension
    fs.renameSync(path.join(__dirname, "..", "Uploading") + req.file.originalname,
        path.join(__dirname, "..", "Imagenes") + req.body.id + "." + req.file.originalname.split(".")[1])
    filePath = "localhost:3001/Imagenes/" + req.body.id + "." + req.file.originalname.split(".")[1]
    return filePath
};

exports.reemplazarImagen = async (req, res) => {
    let filePath = path.join(__dirname, "..", "Imagenes") + req.body.idVIejo
    try {
        if (fs.existsSync(filePath + ".png") || fs.existsSync(filePath + ".jpg")) {
            fs.unlink(filePath + ".png")
            fs.unlink(filePath + ".jpg")
        }
    }
    catch (error) {
        res.status(400).json({ error: "File deleting error" })
    }
    ruta = this.moverImagen(req)
    return ruta
};