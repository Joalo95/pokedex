import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registrarUsuario } from "../../API/rule_Registrar";
import "../Register/registrar.css";
import { loguearUsuario } from "../../API/rule_Login";

function Registrar() {
  const [usuario, setUsuario] = useState("");
  const [nombre, setNombre] = useState("");
  const [clave, setClave] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [mostrarClave, setMostrarClave] = useState(false);
  const [icono, setIcono] = useState("mostrar"); // Cambiar a "ocultar" cuando la clave se muestra

  const handleToggleClave = () => {
    setMostrarClave(!mostrarClave);
    setIcono(icono === "mostrar" ? "ocultar" : "mostrar");
  };

  let navigate = useNavigate();

  const onChangeValueUsuario = (e) => {
    setUsuario(e.target.value);
  };

  const onChangeValueNombre = (e) => {
    setNombre(e.target.value);
  };

  const onChangeValueClave = (e) => {
    setClave(e.target.value);
  };

  const onSubmitSesion = async (e) => {
    e.preventDefault();
    const user = { correo: usuario, clave: clave };
    try {
      const registroExitoso = await registrarUsuario({
        nombre: nombre,
        correo: usuario,
        clave: clave,
        permisos: 1
      });

      if (registroExitoso) {
        const response = await loguearUsuario(user);
        if (!(response instanceof Error)) {
          localStorage.setItem("JSONToken", response.token);
          navigate("/")
        } else {
          setMensajeError(response.message);
        }
      }
    } catch (error) {
      setMensajeError(error.message);
    }
  };
  return (
    <main className="w-screen h-screen p-6 flex flex-col items-center justify-center">
      <div className="mx-auto px-6 h-4/5 w-1/4">
        <form className="flex flex-col justify-around h-full" onSubmit={onSubmitSesion}>
          <div className="group">
            <input
              className="input"
              type="text"
              onChange={onChangeValueUsuario}
              value={usuario}
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label htmlFor="email">Correo</label>
          </div>
          <div className="group">
            <input
              className="input"
              type="text"
              onChange={onChangeValueNombre}
              value={nombre}
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label htmlFor="Nombre">Nombre</label>
          </div>
          <div className="">
            <div className="group">
              <input
                className="input"
                type={mostrarClave ? "text" : "password"}
                value={clave}
                onChange={onChangeValueClave}
                required
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label htmlFor="password" required>Contraseña</label>
            </div>
            <button
              onClick={handleToggleClave}
              className="relative bottom-8 left-40"
            >
              {mostrarClave ? (
                <img src="/images/ShowPass.svg" />
              ) : (
                <img src="./images/HiddenPass.svg" />
              )}
            </button>
          </div>
          {mensajeError && <p style={{ color: 'red' }}>{mensajeError}</p>}
          <div className="flex justify-start">
            <label className="block text-gray-400 my-4 text-[0.65rem] leading-[0.85rem]">
              <input className="text-blue-500 top-0" type="checkbox" />
              <span className="ml-2 py-2 text-gray-400">Acepte los &nbsp;
                <a href="#"
                  className="text-black hover:text-gray-500">
                  Términos y Condiciones del sitio &nbsp;
                </a>y &nbsp;
                <a href="#"
                  className="text-black hover:text-gray-500">
                  la política de manejo de la información.</a>
              </span>
            </label>
          </div>
          <div className="flex flex-col space-y-5 justify-center items-center overflow-hidden w-full">
            <button className="w-[70%] border border-gray-300 text-blue-500 font-semibold mb-6 md:mb-0 hover:border-gray-900 hover:bg-gray-900 text-sm p-3 rounded-lg tracking-wide cursor-pointer transition ease-in duration-500" type="submit">
              Registrarme
            </button>
          </div>
        </form>
      </div>
      <div className="text-gray-400 h-1/8 flex flex-col items-center">
        <span>
          Ya tienes cuenta? &nbsp;
          <Link to="/login">
            <a className="text-sm text-blue-500 hover:text-blue-700">
              Inicia sesión
            </a>
          </Link>
        </span>
        <Link to="/">
          <a className="text-md text-blue-500 hover:text-blue-700">
            Volver a la Pokedex
          </a>
        </Link>
      </div>
    </main>
  )


}
export default Registrar;