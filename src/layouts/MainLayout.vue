<template>
  <q-layout
    :class="store.$state.loadingImg ? 'bg-loading' : ''"
    view="lHh Lpr lFf"
  >
    <div
      v-if="store.$state.loadingImg"
      class="full-height full-width flex justify-center items-center"
    >
      <q-img
        src="/poke.gif"
        :ratio="1"
        class="img-loading z-max"
        width="200px"
        spinner-color="primary"
        spinner-size="82px"
      />
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { usePokemon } from "stores/pokemon";
const store = usePokemon();
name: "MainLayout";
</script>
