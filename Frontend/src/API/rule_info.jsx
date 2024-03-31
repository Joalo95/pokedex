import API from "./rule_API";

export const getPokemones = async () => {
  return await API.get("/pokedex")
    .then((response) => {
      return response.data; //ARRAY de objetos es el data
    })
    .catch((error) => {
      throw error.response.data.error || "Error procesando la solicitud";
    });
};

export const getPokemonById = async (id) => {
  return await API.get("/pokedex/" + id)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data.error || "Error procesando la solicitud";
    });
};
