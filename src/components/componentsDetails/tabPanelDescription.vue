<template>
  <div class="col-4">
    <ul class="">
      <ol class="q-py-xs text-dark" v-for="(item, index) in list" :key="index">
        {{
          item
        }}
      </ol>
    </ul>
  </div>
  <div class="col-8">
    <ul class="text-decription">
      <ol class="q-py-xs">
        {{
          data.species.name
        }}
      </ol>
      <ol class="q-py-xs">
        {{
          convert(data.height, "height")
        }}
      </ol>
      <ol class="q-py-xs">
        {{
          convert(data.weight, "weight")
        }}
      </ol>
      <ol class="q-py-xs ellipsis">
        <span v-for="(abi, index) in data.abilities" :key="index">
          {{ abi.ability.name }}
          <span v-if="index + 1 != data.abilities.length">,</span>
        </span>
      </ol>
      <ol class="q-py-xs">
        {{
          data.base_experience
        }}
      </ol>
      <ol class="q-py-xs">
        <span v-for="(types, index) in data.types" :key="index">
          <q-chip
            class="text-white q-my-none text-weight-light"
            square
            :class="`bg-${getIconType(types.type.name).background}`"
            :label="types.type.name"
          />
        </span>
      </ol>
    </ul>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { getIconType } from "../../helpers/iconType";
const props = defineProps(["data"]);

const list = [
  "Species:",
  "Height:",
  "Weight:",
  "Abilities:",
  "Experience:",
  "Type:",
];

// Unit conversion in pokemon description

const convert = (value, type) => {
  let result = "";
  if (type == "height") {
    let inch = parseFloat(value * 3.937).toFixed(2);
    let cm = parseFloat(value * 10).toFixed(2);
    result = `${inch}" (${cm} cm)`;
  } else {
    let lb = parseFloat(value / 4.536).toFixed(2);
    let kg = parseFloat(value * 10).toFixed(2);
    result = `${kg} kg (${lb} lbs)`;
  }
  return result;
};
</script>
