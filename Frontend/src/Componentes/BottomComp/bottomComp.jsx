import "./bottomComp.css";
import Card from "../Card/card";
import { Link, useNavigate } from "react-router-dom";

function BottomComp(props) {
  let navigate = useNavigate();

  const onSubmitLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <div className="cards">
        {props.pokemones?.map((poke) => (
          <Link key={poke.id} to={`/pokemons/${poke.id}`}>
            <Card pokeTipo={poke.tipo_id[0]} pokeNombre={poke.nombre} pokeId={poke.id} pokeImg={"http://" + poke.foto} />
          </Link>
        ))}

        <Link to={`/Agregar`}>
          <div className="bottomCompDiv">
            <p className="text-md ml-1 mt-1">
              #00
            </p>
            <img className="bottomCompImg" src={"/images/add.png"} alt="" />
            <h5 className="bottomCompNombres">
              Agregar
            </h5>
          </div>
        </Link>
      </div>
      <div className="btnCointainerBottomComp">
        {localStorage.getItem("token") ?
          (
            < button onClick={onSubmitLogout} className="btnBottomComp">Cerrar sesión</button>
          ) : (<Link to="login">
            < button className="btnBottomComp">Iniciar sesión</button>
          </Link>)
        }
      </div>
    </>
  );
}

export default BottomComp;
