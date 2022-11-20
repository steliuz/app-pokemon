<template>
  <q-card
    class="card-pokemon q-ma-lg cursor-pointer"
    @click="showDetail(props.data)"
  >
    <div class="flex flex-center box-img">
      <img :src="props.data.sprites.front_default" />
    </div>
    <q-card-section class="bg-white q-pb-none">
      <div class="text-name text-capitalize">{{ props.data.name }}</div>
      <div class="text-sub q-mt-sm"># {{ props.data.id }}</div>
      <div class="text-sub flex q-mt-sm">
        <p class="q-mr-sm q-mb-none">
          Moves <span class="q-ml-sm">{{ props.data.moves.length }}</span>
        </p>
        <p class="q-ml-md q-mb-none">
          Experience
          <span class="q-ml-sm">{{ props.data.base_experience }}</span>
        </p>
      </div>
    </q-card-section>
    <q-card-section class="bg-white flex q-px-sm q-pt-sm">
      <div v-for="(type, index) in props.data.types" :key="index">
        <q-chip class="chip-card">
          <q-avatar size="12px">
            <img
              :src="`./icons-type/${getIconType(type.type.name).name}.png`"
            />
          </q-avatar>
          {{ type.type.name }}
        </q-chip>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useRouter } from "vue-router";
import { getIconType } from "../helpers/iconType";
const props = defineProps({
  data: { type: Object, required: true },
});

const router = useRouter();

const showDetail = (value) => {
  router.push({ path: `/detail/${props.data.id}` });
};
</script>
