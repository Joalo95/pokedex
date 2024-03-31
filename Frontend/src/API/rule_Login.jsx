import API from "./rule_API";

export const loguearUsuario = async (form) => {
  return await API.post("/users/login", form)
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
