<template>
  <div class="bg-secondary">
    <img
      class="absolute arrow-back"
      src="/icons-type/arrow-back.png"
      @click="$router.go(-1)"
    />
    <div class="flex flex-center column img-header">
      <p class="q-mb-none">
        <span class="text-name text-capitalize">{{ props.name }}</span> #
        <span class="text-h6">{{ props.id }}</span>
      </p>
      <q-img
        class="img"
        :src="props.img"
        :ratio="1"
        width="120px"
        fit="contain"
        spinner-color="primary"
        spinner-size="82px"
      />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const data = ref({
  name: "",
  id: "",
  src: "",
});

const props = defineProps(["data", "name", "id", "img"]);
</script>
