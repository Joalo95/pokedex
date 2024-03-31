import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loguearUsuario } from "../../API/rule_Login";
import "./login.css";
import AuthContext from "../../Utilities/AuthProvider";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const mensajeErrorRef = useRef("");
  const [mostrarClave, setMostrarClave] = useState(false);
  const [icono, setIcono] = useState("mostrar"); // Cambiar a "ocultar" cuando la clave se muestra
  const { setAuth } = useContext(AuthContext);


  const handleToggleClave = () => {
    setMostrarClave(!mostrarClave);
    setIcono(icono === "mostrar" ? "ocultar" : "mostrar");
  };

  let navigate = useNavigate();

  const onChangeValueUsuario = (e) => {
    setUsuario(e.target.value);
  };

  const onChangeValueClave = (e) => {
    setClave(e.target.value);
  };

  const onSubmitSesion = async (e) => {
    e.preventDefault();
    const user = { correo: usuario, clave: clave };

    try {
      const response = await loguearUsuario(user);
      if (!(response instanceof Error)) {
        localStorage.setItem("token", response.token);
        setAuth(response.token);
        navigate("/")
      } else {
        mensajeErrorRef.current = response.message;
        // Actualiza la referencia para mostrar el mensaje de error en pantalla
      }
    } catch (error) {
      mensajeErrorRef.current = error.message;
      // Actualiza la referencia para mostrar el mensaje de error en pantalla
    }
  };

  return (
    <main className="w-screen h-screen p-6 flex flex-col items-center justify-center">
      <div className="mx-auto px-6 h-1/2 w-1/4">
        <form className="flex flex-col justify-around h-full w-full" onSubmit={onSubmitSesion}>
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
          <div className="absolute">
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
          {mensajeErrorRef.current && (
            <p style={{ color: 'red' }}>{mensajeErrorRef.current}</p>
          )}
          <div className="flex">
            <div className="text-sm m-auto leading-[0.65rem]">
              <a href="#" className="text-[0.65rem] text-blue-500 hover:text-blue-700">
                Olvidaste tu contraseña?
              </a>
            </div>
            &nbsp;
            <div className="flex items-center justify-center overflow-hidden w-full">
              <button className="w-[70%] border border-gray-300 text-blue-500 font-semibold mb-6 md:mb-0 hover:border-gray-900 hover:bg-gray-900 text-sm p-3 rounded-lg tracking-wide cursor-pointer transition ease-in duration-500" type="submit">
                Iniciar
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="flex items-center justify-center space-x-2 my-5">
        <span className="h-px w-16 bg-gray-100"></span>
        <span className="text-gray-300 font-normal">or</span>
        <span className="h-px w-16 bg-gray-100"></span>
      </div>
      <div className="flex justify-center gap-5 mx-auto w-1/4 ">
        <button type="submit" className="w-full flex items-center justify-center mb-6 md:mb-0 border border-gray-300 hover:border-gray-900 hover:bg-gray-900 text-sm text-gray-500 p-3 rounded-lg tracking-wide font-medium  cursor-pointer transition ease-in duration-500">
          <img className="w-4 mr-2" src="/images/Google.svg" alt="" />
          <span>Google</span>
        </button>
        <button type="submit" className="w-full flex items-center justify-center mb-6 md:mb-0 border border-gray-300 hover:border-gray-900 hover:bg-gray-900 text-sm text-gray-500 p-3 rounded-lg tracking-wide font-medium  cursor-pointer transition ease-in duration-500">
          <img className="w-4 mr-2" src="/images/Facebook.svg" alt="" />
          <span>Facebook</span>
        </button>
      </div>
      <div className="text-gray-400 m-auto flex flex-col items-center">
        <span>
          No tienes cuenta? &nbsp;
          <Link to="/registrar">
            <a className="text-sm text-blue-500 hover:text-blue-700">
              Regístrate
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
export default Login;