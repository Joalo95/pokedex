import API from "./rule_API";

export const crearPokemon = (form) => {
  return API.post("/pokemon/nuevo", form, {
    headers: { "Content-Type": "multipart/form-data" }
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return (error)
    });
};