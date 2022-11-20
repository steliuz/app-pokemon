import { reactive, ref } from "vue";
import stores from "stores/index";
import { usePokemon } from "stores/pokemon";
import { useTotal } from "../composables/useTotalPokemons";
import { useGetPokemons } from "../composables/useGetPokemons";

const { offset, limit, getPokemons, max } = useGetPokemons();
const { search, all } = useTotal();
const store = usePokemon();
const current = ref(1);

// pagination function, where the OFFSET and the LIMIT are defined

export function usePagination() {
  const pagination = (pages) => {
    store.clearArray();
    let dataFil = store.dataFilter;
    const resultArray = ref([]);
    dataFil = [...new Set(dataFil.map((item) => item))];
    limit.value = 5;

    offset.value = limit.value * (pages - 1);
    if (search.value != "" || store.getStatus) {
      dataFil.filter((v, index) => {
        if (offset.value == 0) {
          if (index < limit.value) {
            resultArray.value.push(v);
          }
        } else if (offset.value > 0) {
          if (resultArray.value.length < 5 && index + 1 > offset.value) {
            resultArray.value.push(v);
          }
        }
      });

      store.getNewArray(resultArray.value);
      max.value = Math.ceil(store.countFilter / limit.value);
      setTimeout(() => {
        store.handleLoading(false);
      }, 5000);
    } else if (search.value == "") {
      store.handleLoading(false);
      getPokemons();
    }
  };

  return {
    pagination,
    current,
  };
}
