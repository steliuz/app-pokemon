<template>
  <section>
    <div class="bg-secondary">
      <img
        class="absolute arrow-back"
        src="/icons-type/arrow-back.png"
        @click="$router.go(-1)"
      />
      <div class="flex flex-center column img-header">
        <p class="q-mb-none">
          <span class="text-name text-capitalize">Pikachu</span> #
          <span class="text-h6">25</span>
        </p>
        <q-img
          class="img"
          src="/icons-type/arrow-back.png"
          :ratio="1"
          width="120px"
          fit="contain"
          spinner-color="primary"
          spinner-size="82px"
        />
      </div>
    </div>
  </section>
  <section>
    <h1>{{ msg }}</h1>
    <p>
      <q-input v-model="inputText" type="text" label="Mensaje" />
      <q-btn
        submit
        color="primary"
        icon="check"
        label="OK"
        @click="msg = inputText"
      />
    </p>
  </section>
</template>

<script setup>
import { ref } from "vue";
const inputText = ref("");
const msg = ref("");
</script>
