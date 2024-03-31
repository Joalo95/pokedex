import API from "./rule_API";

export const editarPokemon = (form) => {
  return API.put("/pokemon/editar", form, {
    headers: { "Content-Type": "multipart/form-data" }
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return (error)
    });
};