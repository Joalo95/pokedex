export const numeroATipo = (numero) => {
  const tipos = {
    1: "Normal",
    2: "Rock",
    3: "Ghost",
    4: "Steel",
    5: "Water",
    6: "Fighting",
    7: "Flying",
    8: "Poison",
    9: "Fairy",
    10: "Dragon",
    11: "Dark",
    12: "Electric",
    13: "Grass",
    14: "Fire",
    15: "Ice",
    16: "Psychic",
    17: "Bug",
    18: "Ground"
  };

  return tipos[numero] || "Normal";
}

export const tipoAcolor = (tipo) => {
  const colores = {
    "Normal": "#AAA67f",
    "Rock": "#B69E31",
    "Ghost": "#70559B",
    "Steel": "#B7B9D0",
    "Water": "#6493EB",
    "Fighting": "#C12239",
    "Flying": "#A891EC",
    "Poison": "#A43E9E",
    "Fairy": "#E69EAC",
    "Dragon": "#7037FF",
    "Dark": "#75574C",
    "Electric": "#F9CF30",
    "Ice": "#9AD6DF",
    "Fire": "#F57D31",
    "Psychic": "#FB5584",
    "Bug": "#A7B723",
    "Grass": "#74CB48",
    "Ground": "#DEC168"
  };

  return colores[tipo] || "#666666";
}
