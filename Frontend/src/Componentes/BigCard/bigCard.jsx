import "./bigCard.css";
import { tipoAcolor, numeroATipo } from "../../Utilities/utilities";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { eliminarPokemon } from "../../API/rule_eliminar";
import { getPokemones, getPokemonById } from "../../API/rule_info";
import Stats from "../Stats/Stats";

function BigCard() {
  const { idPokemons } = useParams();
  const [pokemones, setPokemones] = useState([{ id: "0" }, { id: "1" }, { id: "2" }]);
  const [poke, setPoke] = useState({
    id: "000",
    nombre: "Desconocido",
    img: "/images/000.svg",
    tipo1: "Normal",
    tipo2: "",
    weight: "10,0kg",
    height: "1,0m",
    ability1: "",
    ability2: "",
    stats: {
      hp: "033",
      atk: "136",
      def: "000",
      satk: "006",
      sdef: "006",
      spd: "029",
    },

    descripcion: ".....",
  });
  const [indice, setIndice] = useState(1);

  const indiceActual = (pokemon, listaPokemones) => {
    setIndice(listaPokemones.findIndex((po) => po.id === pokemon.id));
  };

  function deletePokemon() {
    eliminarPokemon(poke.id).then(function (response) {
      setPoke({
        id: "003",
        nombre: "MissingNo",
        img: "/images/000.svg",
        tipo1: "Normal",
        tipo2: "",
        weight: "10,0kg",
        height: "1,0m",
        ability1: "Error",
        ability2: "",
        stats: {
          hp: "036",
          atk: "136",
          def: "000",
          satk: "006",
          sdef: "006",
          spd: "029",
        },

        descripcion: ".....",
      });
    });
  }

  useEffect(() => {
    getPokemonById(idPokemons).then((data) => {
      //Convierte los stats a string porque despues se les hace concat que es una funcion de String
      data[0].stats = { hp: String(data[0].hp), atk: String(data[0].atk), def: String(data[0].def), satk: String(data[0].satk), sdef: String(data[0].sdef), spd: String(data[0].spd) };
      data[0].tipo1 = numeroATipo(data[0].tipo_id[0]);
      data[0].tipo2 = numeroATipo(data[0].tipo_id[1]);
      data[0].height = String(data[0].altura).replace(".", ",") + "m";
      data[0].weight = String(data[0].peso).replace(".", ",") + "kg";
      delete data[0]["altura"];
      delete data[0]["peso"];
      delete data[0]["hp"];
      delete data[0]["atk"];
      delete data[0]["def"];
      delete data[0]["sdef"];
      delete data[0]["satk"];
      delete data[0]["spd"];
      data[0].ability1 = data[0].habilidad[0];
      if (data[0].habilidad[1]) {
        data[0].ability2 = data[0].habilidad[1];
      }
      delete data[0]["habilidad"];
      setPoke(data[0]);
      getPokemones().then((dato) => {
        setPokemones(dato);
        indiceActual(data[0], dato);
      });
    });
  }, []);
  console.log(poke)
  return (
    <div id="bigCardDiv" style={{ backgroundColor: tipoAcolor(poke.tipo1) }}>
      <div id="bigCardTopDiv">
        <Link to={"/"}>
          <div id="bigCardArrow"> </div>
        </Link>
        <p id="bigCardName">{poke.nombre}</p>
        <p id="bigCardId">#{poke.id}</p>
        <Link id="bigCardArrowLeft" to={`/pokemons/${pokemones[indice == 0 ? pokemones.length - 1 : indice - 1].id}`} onClick={getPokemonById(pokemones[indice == 0 ? pokemones.length - 1 : indice - 1].id)}>
          {/* <img src="/images/arrowLeft.svg" alt="arrowLeft" /> */}
        </Link>
        {/* Si esta en el primer elemento, llevar a ultimo elemento, sino, restar uno al indice (moverse a la izq) */}

        <img src={"http://" + poke.foto} id="bigCardPokeImg" alt={poke.nombre} />

        <Link id="bigCardArrowRight" to={`/pokemons/${pokemones[pokemones.length - 1 == indice ? 0 : indice + 1].id}`} onClick={getPokemonById(pokemones[pokemones.length - 1 == indice ? 0 : indice + 1].id)}>
          {/* <img src="/images/Frame.svg" alt="arrowRight" /> */}
        </Link>
        {/* Si esta antes de ultima posicion, entonces sumar uno al indice (moverse a la der). Si no (ultima posicion), llevar al primer elemento */}
      </div>
      <div id="bigCardBottomDiv">
        <div id="bigCardTipos">
          <p className="tipo" style={{ backgroundColor: tipoAcolor(poke.tipo1) }} id="tipo1">
            {poke.tipo1}
          </p>
          {poke.tipo2 !== "" && (
            <p className="tipo" style={{ backgroundColor: tipoAcolor(poke.tipo2) }} id="tipo2">
              {poke.tipo2}
            </p>
          )}
        </div>
        <div id="bigCardPokeParams">
          <div id="bigCardWeight">
            <img id="bigCardWeightImage" src="/images/Weight.svg" />
            <p className="bigCardPokeParamsP">{poke.weight}</p>
            <p id="bigCardParamsWeight" className="bigCardPokeParamsDesc">
              Peso
            </p>
          </div>
          <div id="bigCardHeight">
            <img id="bigCardHeightImage" src="/images/Height.svg" />
            <p className="bigCardPokeParamsP">{poke.height}</p>
            <p id="bigCardParamsHeight" className="bigCardPokeParamsDesc">
              Altura
            </p>
          </div>
          <div id="bigCardAbilities">
            <div id="bigCardAbilitiesDiv">
              <p className="bigCardPokeParamsP">{poke.ability1}</p>
              {poke.ability2 !== "" && <p className="bigCardPokeParamsP">{poke.ability2}</p>}
            </div>
            <p id="bigCardParamsAbilities" className="bigCardPokeParamsDesc ">
              Habilidades
            </p>
          </div>
        </div>
        <div id="bigCardDesc">
          <p className="bigCardPokeParamsDesc">Descripcion</p>
          <p >{poke.descripcion}</p>
        </div>
        <div id="bigCardStats">
          <p id="bigCardBaseStats" className="bigCardPokeParamsDesc">Estadisticas</p>
          <div style={{ color: tipoAcolor(poke.tipo1) }} id="bigCardStatNames">
            <p className="bigCardPStat">HP</p>
            <p className="bigCardPStat">ATK</p>
            <p className="bigCardPStat">DEF</p>
            <p className="bigCardPStat">SATK</p>
            <p className="bigCardPStat">SDEF</p>
            <p className="bigCardPStat">SPD</p>
          </div>
          <div id="bigCardStatValues">
            <p>{poke.stats.hp}</p>
            <p>{poke.stats.atk}</p>
            <p>{poke.stats.def}</p>
            <p>{poke.stats.satk}</p>
            <p>{poke.stats.sdef}</p>
            <p>{poke.stats.spd}</p>
          </div>
          <div id="bigCardStatBars">
            <Stats pokeStats={poke.stats} pokeTipo={poke.tipo1} />
          </div>
        </div>
      </div>
      <div id="bigCardPokeBallImage"></div>
      <div className="btnGroupBigCard">
        < button onClick={deletePokemon} className="btnBigCard">Eliminar</button>
        <Link id="editar" to={`/editar?id=${poke.id}&nombre=${poke.nombre}&imagen=${poke.foto}&tipo1=${poke.tipo1}&tipo2=${poke.tipo2}&weight=${poke.weight}&height=${poke.height}&abilities=${poke.ability1}/${poke.ability2}&hp=${poke.stats.hp}&atk=${poke.stats.hp}&def=${poke.stats.def}&satk=${poke.stats.satk}&sdef=${poke.stats.sdef}&spd=${poke.stats.spd}`}>
          < button className="btnBigCard">Editar</button>
        </Link>
      </div>
    </div>
  );
}

export default BigCard;
