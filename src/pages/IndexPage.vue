<template>
  <section class="bg-body">
    <img class="pokeball" src="~assets/pokeball.png" alt="" />
    <div class="bg-banner relative-position">
      <div class="q-pa-md absolute-bottom q-mb-lg z-index-2">
        <p class="title-banner">
          What pokemon are you <br />
          looking for?
        </p>
        <div class="row">
          <div class="col-12">
            <q-input
              v-model="search"
              filled
              color="white"
              input-class="white"
              placeholder="Search pokemon"
              type="text"
              debounce="500"
              :rules="[rules]"
              lazy-rules
              @change="filterPokemons"
            >
              <template v-slot:append>
                <q-icon
                  v-if="search.length >= 3"
                  name="close"
                  @click="clearInput"
                  class="cursor-pointer"
                />
                <q-icon name="search" @click="filterPokemons" />
              </template>
              <template v-slot:after>
                <q-icon
                  size="md"
                  name="tune"
                  color="white"
                  @click="confirm = !confirm"
                />
              </template>
            </q-input>
          </div>
        </div>
      </div>
    </div>
    <DialogFilter
      :openDialog="confirm"
      @resultMove="filterPokemons"
      @closed="confirm = false"
    ></DialogFilter>
    <div v-if="store.status != false" class="text-results q-mx-lg q-mt-sm">
      {{ store.countFilter }} results
    </div>
    <div id="boxTop" class="row padding-bottom" v-if="store.countData > 0">
      <div
        v-for="(item, index) in store.dataPokemons"
        :key="index"
        class="col-12 col-sm-6 col-md-4"
      >
        <card-pokemon :data="item"></card-pokemon>
      </div>
    </div>
    <div v-else>
      <div class="col-12 vh-100">
        <div class="text-results q-mx-lg q-mt-sm">
          <p class="text-h5 text-center q-mb-none">Pokemon Not Found :(</p>
        </div>
      </div>
    </div>
    <div
      class="q-py-lg q-mt-lg flex flex-center absolute-bottom shadow-2 bg-pagination"
    >
      <q-pagination
        v-if="max > 1"
        v-model="current"
        shadow-2
        :max="max"
        :max-pages="5"
        direction-links
        :boundary-numbers="false"
        :ellipses="false"
        color="dark"
        active-color="primary"
        padding="8px 0px"
        gutter="sm"
        @click="scrollTop"
        @update:model-value="pagination"
      />
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import cardPokemon from "../components/cardPokemon.vue";

import DialogFilter from "../components/DialogFilter.vue";
import { useTotal } from "../composables/useTotalPokemons";
import { useGetPokemons } from "../composables/useGetPokemons";
import { usePagination } from "../composables/usePagination";

import { usePokemon } from "stores/pokemon";
const store = usePokemon();

const rules = (val) => val.length >= 3 || "Please use minimum 3 characters";
const { totalPokemons, search, all } = useTotal();
const { offset, limit, getPokemons, max } = useGetPokemons();
let { pagination, current } = usePagination();

const confirm = ref(false);

const clearInput = () => {
  search.value = "";
  current.value = 1;
  filterPokemons();
};

const scrollTop = () => {
  const scrollDiv = document.getElementById(".boxTop");
  window.scrollTo({ top: scrollDiv, behavior: "smooth" });
};

const filterPokemons = () => {
  let dataFilter = all.value;
  let moves = store.getAdv.moves;
  let exp = store.getAdv.experience;
  let type = store.getAdv.type;

  store.clearArray();
  if (!moves && !exp && type.length == 0) store.setStatus(false);

  if (search.value || store.status) {
    store.setStatus(true);
    current.value = 1;

    if (search.value) {
      dataFilter = dataFilter.filter((v) => {
        return v.name.includes(search.value.toString().toLowerCase());
      });
    }

    if (moves) {
      dataFilter = dataFilter.filter((v) => {
        return v.moves.length == moves;
      });
    }
    if (exp) {
      dataFilter = dataFilter.filter((v) => {
        return v.base_experience == exp;
      });
    }
    if (type && type.length > 0) {
      dataFilter = dataFilter.filter((v) => {
        if (type) {
          let exist = false;
          v.types.filter((e) => {
            for (let index = 0; index < type.length; index++) {
              if (type[index] == e.type.name) exist = true;
            }
          });
          return exist;
        }
      });
    }
    store.setArrayFilter(dataFilter);
    pagination(1);
  } else {
    store.handleLoading(false);
    store.$patch({ status: false });
    limit.value = 5;
    getPokemons();
  }
};

onMounted(() => {
  // setTimeout(() => {
  //   store.handleLoading(true);
  // }, 3000);
  getPokemons();
  totalPokemons();
});
</script>
