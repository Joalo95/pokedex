import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./Utilities/AuthProvider";
import BigCard from "./Componentes/BigCard/bigCard";
import Pokedex from "./Componentes/Pokedex/pokedex";
import ErrorComp from "./Componentes/ErrorComp/ErrorComp";
import Login from "./Componentes/Login/Login";
import Registrar from "./Componentes/Register/Register";
import PokemonFormComp from "./Componentes/PokemonFormComp/PokemonFormComp";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Pokedex />,
  },
  {
    path: "pokemons/:idPokemons",
    element: <BigCard />,
  },
  {
    path: "*",
    element: <ErrorComp />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "registrar",
    element: <Registrar />,
  },
  {
    path: "agregar",
    element: <PokemonFormComp tarea="agregar" />
  },
  {
    path: "editar",
    element: <PokemonFormComp tarea="editar/:id:" />
  }

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </AuthProvider>
)
