const getIconType = (value) => {
  let condition;
  let data = {
    grass: () => {
      condition = { name: "grass", background: "positive" };
    },
    bug: () => {
      condition = { name: "bug", background: "bug" };
    },
    poison: () => {
      condition = { name: "poison", background: "accent" };
    },
    flying: () => {
      condition = { name: "flying", background: "flying" };
    },
    ground: () => {
      condition = { name: "ground", background: "ground" };
    },
    fighting: () => {
      condition = { name: "fighting", background: "fighting" };
    },
    psychic: () => {
      condition = { name: "psychic", background: "psychic" };
    },
    steel: () => {
      condition = { name: "steel", background: "steel" };
    },
    ice: () => {
      condition = { name: "ice", background: "ice" };
    },
    ghost: () => {
      condition = { name: "ghost", background: "ghost" };
    },
    rock: () => {
      condition = { name: "rock", background: "rock" };
    },
    fire: () => {
      condition = { name: "fire", background: "fire" };
    },
    electric: () => {
      condition = { name: "electric", background: "electric" };
    },
    water: () => {
      condition = { name: "water", background: "water" };
    },
    default: () => {
      condition = { name: "normal", background: "normal" };
    },
  };

  (data[value] || data["default"])();
  return condition;
};
export { getIconType };
