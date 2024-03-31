import API from "./rule_API";

export const registrarUsuario = async (form) => {
  console.log(form)
  return await API.post("/users/register", form)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error
    });
};