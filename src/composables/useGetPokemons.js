import { api } from "src/boot/axios";
import { ref } from "vue";
import { usePokemon } from "stores/pokemon";
// import { storeIndex } from "stores/index";

const offset = ref(0);
const limit = ref(5);
const max = ref(1);
const resultArray = ref([]);
const store = usePokemon();
export function useGetPokemons() {
  const getPokemons = () => {
    store.clearFilter();
    store.clearArray();
    resultArray.value = [];
    api
      .get(`/pokemon/?offset=${offset.value}&limit=${limit.value}`)
      .then((resp) => {
        max.value = parseInt(resp.data.count / limit.value);
        resp.data.results.map((v) => {
          let cut = v.url.split("/pokemon");
          api
            .get(`/pokemon${cut[1]}`)
            .then((resp) => {
              resultArray.value.push(resp.data);
            })
            .catch((err) => console.log("err: ", err));
        });
        store.getNewArray(resultArray.value);
      })
      .catch((err) => console.log("Error :", err));
  };

  return {
    offset,
    max,
    limit,
    getPokemons,
  };
}
