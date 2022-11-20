import { defineStore } from "pinia";

export const usePokemon = defineStore("pokemon", {
  state: () => ({
    pokemon: {},
    advanceFilter: {
      name: "",
      moves: "",
      experience: "",
      type: [],
    },
    status: false,
    stats: {},
    loadingImg: false,
    ArrayPokemons: [],
    ArrayFiltersPokemons: [],
  }),
  getters: {
    dataPokemons: (store) => store.ArrayPokemons,
    dataFilter: (store) => store.ArrayFiltersPokemons,
    countData: (store) => store.ArrayPokemons.length,
    countFilter: (store) => store.ArrayFiltersPokemons.length,
    getAdv: (store) => store.advanceFilter,
    getStatus: (store) => store.status,
    getStats: (store) => store.stats,
    getLoading: (store) => store.loadingImg,
  },
  actions: {
    setStatus(payload) {
      this.status = payload;
    },
    getNewArray(payload) {
      this.ArrayPokemons = payload;
    },
    setArrayFilter(payload) {
      this.ArrayFiltersPokemons = payload;
    },

    handleLoading(payload) {
      this.loadingImg = payload;
    },

    setStats(payload) {
      this.stats = payload;
    },

    clearFilter() {
      this.ArrayFiltersPokemons = [];
    },

    calMax(payload) {
      return Math.ceil(this.ArrayFiltersPokemons.length / payload);
    },

    clearArray() {
      this.ArrayPokemons = [];
    },
  },
});
