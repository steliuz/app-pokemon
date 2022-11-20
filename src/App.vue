<template>
  <div class="z-max" :class="store.getLoading ? 'bg-loading' : ''"></div>
  <router-view />
</template>

<script setup>
import { defineComponent } from "vue";
import { usePokemon } from "stores/pokemon";
const store = usePokemon();
</script>
