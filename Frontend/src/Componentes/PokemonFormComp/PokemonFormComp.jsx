import "../PokemonFormComp/PokemonFormComp.css";
import { useState } from "react";
import { crearPokemon } from "../../API/rule_crear"
import { editarPokemon } from "../../API/rule_editar"
import { useNavigate } from "react-router-dom";

const initialValues = {
  id: "",
  nombre: "",
  img: "",
  tipo1: "",
  tipo2: "",
  weight: "",
  height: "",
  abilities: "",
  hp: "",
  atk: "",
  def: "",
  satk: "",
  sdef: "",
  spd: "",
  descripcion: "",
};

function PokemonFormComp(params) {

  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const [texto, setTexto] = useState("")

  const [formValues, setFormValues] = useState(() => {
    const initialFormValues = {};
    for (const key of Object.keys(initialValues)) {
      initialFormValues[key] = queryParams.get(key) || initialValues[key];
    }
    return initialFormValues;
  });
  const [imgPreview, setImgPreview] = useState(queryParams.get("img") || "");

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onChangeImage = (e) => {
    const imageFile = e.target.files[0];
    const preview = URL.createObjectURL(imageFile);
    setImgPreview(preview);

    setFormValues({
      ...formValues,
      img: imageFile,
    });
  };

  const onSubmitPkmn = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Imagen", formValues.img);

    if (params.tarea === "agregar") {
      setTexto("Creando Pokemon...")
      crearPokemon(formData).then((response) => {
        if (response instanceof Error) {
          setTexto(response.message)
        } else {
          setTexto("Pokemon creado exitosamente")
        }
      })
    }
    else {
      setTexto("Editando Pokemon...")
      editarPokemon(formData).then((response) => {
        if (response instanceof Error) {
          setTexto(response.message)
        } else {
          setTexto("Pokemon editado exitosamente")
          navigate("/Pokemons/" + formValues.id)
        }
      })
    }
  };

  return (
    <div className="register-page">
      <div className="container-form">
        <form onSubmit={onSubmitPkmn} className="register-form">
          {Object.entries(formValues).map(([key, value]) => (
            <div key={key}>
              <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
              {key === "img" ? (
                <>
                  <input type="file" id={key} name={key} onChange={onChangeImage} />
                  <label htmlFor={key}>Imagen subida:</label>
                  {imgPreview ? (
                    <img src={imgPreview} width="100" height="100" alt="Imagen subida" />
                  ) : (
                    <label>?</label>
                  )}
                </>
              ) : (
                <input
                  type="text"
                  id={key}
                  name={key}
                  onChange={onChangeValue}
                  value={value}
                  placeholder={key}
                />
              )}
            </div>
          ))}
          <button id="crearBtn" type="submit">
            Enviar datos
          </button>
          <p className="container">{texto}</p>
        </form>
      </div>
    </div>
  );
}

export default PokemonFormComp;