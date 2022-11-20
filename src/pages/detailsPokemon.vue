<template>
  <section class="">
    <headerDetails
      :name="data.name"
      :id="data.id"
      :img="data.sprites.front_default"
    ></headerDetails>
    <div class="">
      <q-tabs
        v-model="tab"
        active-color="primary"
        class="text-dark q-px-md"
        align="left"
        :breakpoint="300"
      >
        <q-tab name="about" label="About" />
        <q-tab name="move" label="Move" />
      </q-tabs>

      <q-tab-panels v-model="tab">
        <q-tab-panel name="about" class="q-px-lg">
          <div class="row">
            <panelDescription :data="data"></panelDescription>
            <tabGraph :data="data"></tabGraph>
          </div>
        </q-tab-panel>
        <q-tab-panel name="move">
          <p class="q-mb-none text-weight-medium">
            {{ data.moves.length }} moves
          </p>
          <div class="row">
            <div
              class="col-4 col-sm-3 col-md-2 q-pa-sm"
              v-for="(move, index) in data.moves"
              :key="index"
            >
              {{ move.type }}
              <div
                class="text-weight-light"
                :class="
                  'chip-moves ' + (index % 3 == 1 ? 'bg-accent' : 'bg-positive')
                "
              >
                <img
                  width="25"
                  height="25px"
                  class="q-mb-xs"
                  :src="
                    index % 3 == 1
                      ? `/icons-type/circle-accent.png`
                      : `/icons-type/circle-green.png`
                  "
                />
                <p class="ellipsis q-mb-none">{{ move.move.name }}</p>
              </div>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { api } from "boot/axios";

import headerDetails from "../components/componentsDetails/headerDetails.vue";
import panelDescription from "../components/componentsDetails/tabPanelDescription.vue";
import tabGraph from "../components/componentsDetails/tabGraph.vue";

name: "details";

const route = useRoute();
let tab = ref("about");

let data = ref({
  id: "",
  sprites: {},
  species: {},
  height: "",
  weight: "",
  abilities: [],
  types: [],
  stats: [],
});

// Get Details pokemon with id in Route

const getDetailsPokemon = () => {
  let id = route.params.id;
  api
    .get(`/pokemon/${id}`)
    .then((resp) => {
      data.value = resp.data;
    })
    .catch((err) => {
      console.log("Error : ", err);
    });
};

getDetailsPokemon();
</script>
