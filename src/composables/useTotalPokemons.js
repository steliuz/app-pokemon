import { api } from "src/boot/axios";
import { ref } from "vue";
import allPokemons from "../helpers/allPokemons";
const search = ref("");
let all = ref([]);

export function useTotal() {
  const totalPokemons = () => {
    allPokemons.map((v) => {
      if (v.name.includes(search.value) || v.name == "") {
        let cut = v.url.split("/pokemon");
        api
          .get(`/pokemon${cut[1]}`)
          .then((resp) => {
            all.value.push(resp.data);
          })
          .catch((err) => console.log("err: ", err));
      }
    });
  };

  return {
    all,
    search,
    totalPokemons,
  };
}
