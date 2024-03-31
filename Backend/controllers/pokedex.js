const knex = require("../knexfile");
const {
  tipoANumero,
  moverImagen,
  reemplazarImagen,
} = require("../Utilities/Utilities");
const path = require('path');
var fs = require("fs");

exports.mostrarPokemones = async (req, res) => {
  await knex("Pokemones")
    .join("Estadisticas", "Pokemones.id", "Estadisticas.id")
    .then((resultado) => {
      res.status(200).json(resultado);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

exports.mostrarPokemonId = async (req, res) => {
  await knex("Pokemones")
    .where("Pokemones.id", req.params.id)
    .join("Estadisticas", "Pokemones.id", "Estadisticas.id")
    .then((resultado) => {
      res.status(200).json(resultado);
    })
    .catch((error) => {
      console.log(error)
      res.status(400).json({ error: error.message });
    });
};

exports.addPokemon = async (req, res, next) => {
  let pokemon = req.body;
  pokemon.foto = moverImagen(req);
  pokemon.height = parseFloat(
    String(pokemon.height)
      .slice(0, pokemon.height.length - 1)
      .replace(",", ".")
  );
  pokemon.weight = parseFloat(
    String(pokemon.weight)
      .slice(0, pokemon.weight.length - 2)
      .replace(",", ".")
  );
  habilidades = pokemon.abilities.split("/");
  pokemon.tipos = [];
  pokemon.tipos.push(tipoANumero(pokemon.tipo1));
  if (pokemon.tipo2) {
    pokemon.tipos.push(tipoANumero(pokemon.tipo2));
  }
  await knex("Estadisticas")
    .insert({
      id: pokemon.id,
      hp: pokemon.stats.hp,
      atk: pokemon.stats.atk,
      def: pokemon.stats.def,
      satk: pokemon.stats.satk,
      sdef: pokemon.stats.sdef,
      spd: pokemon.stats.spd,
    })
    .then(() => {
      knex("Pokemones")
        .insert({
          id: pokemon.id,
          tipo_id: pokemon.tipos,
          nombre: pokemon.nombre,
          foto: pokemon.foto,
          peso: pokemon.weight,
          altura: pokemon.height,
          habilidades: habilidades,
          descripcion: pokemon.descripcion

        })
        .then(() => {
          res
            .status(201)
            .json({ error: null, data: "Se agrego correctamente el pokemon", pokemon });
        })
        .catch((error) => {
          console.log(error)
          res.status(400).json({ error: error.message });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error: error.message });
    });
};

exports.updatePokemon = async (req, res) => {
  const pokemon = req.body;
  pokemon.height = parseFloat(
    String(pokemon.height)
      .slice(0, pokemon.height.length - 1)
      .replace(",", ".")
  );
  pokemon.weight = parseFloat(
    String(pokemon.weight)
      .slice(0, pokemon.weight.length - 2)
      .replace(",", ".")
  );
  let habilidades = pokemon.abilities.split("/");
  reemplazarImagen(req).then((result) => {
    pokemon.foto = result
  })
  pokemon.tipos = [];
  pokemon.tipos.push(tipoANumero(pokemon.tipo1));
  if (pokemon.tipo2) {
    pokemon.tipos.push(tipoANumero(pokemon.tipo2));
  }
  await knex("Pokemones")
    .update({
      id: pokemon.id,
      tipo_id: pokemon.tipos,
      nombre: pokemon.nombre,
      foto: pokemon.foto,
      peso: pokemon.weight,
      altura: pokemon.height,
      habilidades: habilidades,
      descripcion: pokemon.descripcion,
      fk_estadistica: pokemon.id,
    })
    .where("id", pokemon.idViejo)
    .then(() => {
      knex("Estadisticas")
        .update({
          id: pokemon.id,
          hp: pokemon.stats.hp,
          atk: pokemon.stats.atk,
          def: pokemon.stats.def,
          satk: pokemon.stats.satk,
          sdef: pokemon.stats.sdef,
          spd: pokemon.stats.spd,
        })
        .where("id", pokemon.idViejo)
        .then(() => {
          res
            .status(200)
            .json({ error: null, data: "Se agrego correctamente", pokemon });
        })
        .catch((error) => {
          console.log(error)
          res.status(400).json({ error: error.message });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error: error.message });
    });
};

exports.deletePokemon = async (req, res) => {
  //Borra el pokemon cuyo id es req.params.id
  await knex("Pokemones")
    .where("id", Number(req.params.id))
    .delete()
    .then(() => {
      //Borra la estadistica cuyo id es req.params.id
      knex("Estadisticas")
        .where("id", Number(req.params.id))
        .delete()
        .then(() => {
          //Borro la imagen de la carpeta Imagenes
          filePath = path.join(__dirname, "..", "Imagenes") + req.params.id
          if (fs.existsSync(filePath + ".png")) { //Me fijo si existe un .png
            //Borro la imagen
            fs.unlink(filePath + ".png", (err) => console.log(err) ?? console.log("\nDeleted file"))
            /*   if (err) console.log(err);
              else {
                console.log("\nDeleted file: example_file.txt");
              }
            }) */
          } else if (fs.existsSync(filePath + "jpg")) {  //Me fijo si existe un .jpg
            /* if (err) console.log(err);
            else {
              console.log("\nDeleted file: example_file.txt");
            } */
            //Borro la imagen
            fs.unlink(filePath + ".jpg", (err) => console.log(err) ?? console.log("\nDeleted file"))
          }
          res.status(200).json({ message: "Pokemon borrado correctamente" })
        })
        .catch((error) => {
          //Si no encuentra la imagen regresa 404 pero indica que el pokemon se borro de la base de datos
          res.status(404).json({ error: error.message, message: "Imagen no encontrada, pero borrado de la base de datos." });
        });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};
