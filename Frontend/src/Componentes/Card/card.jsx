import { numeroATipo, tipoAcolor } from "../../Utilities/utilities";

function Card(props) {

  const colorTipo = numeroATipo(props.pokeTipo);

  return (
    <div style={{ borderColor: tipoAcolor(colorTipo) }} className="bottomCompDiv">
      <p style={{ color: tipoAcolor(colorTipo) }} className="text-md ml-1 mt-1">
        #{props.pokeId}
      </p>
      <img className="bottomCompImg" src={props.pokeImg} alt={props.pokeNombre} />
      <h5 style={{ backgroundColor: tipoAcolor(colorTipo) }} className="bottomCompNombres">
        {props.pokeNombre}
      </h5>
    </div>
  );
}

export default Card;
