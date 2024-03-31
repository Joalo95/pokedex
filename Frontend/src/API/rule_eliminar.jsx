import API from "./rule_API";

export const eliminarPokemon = (id) => {
  return API.delete("/pokemon/eliminar/" + id)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};