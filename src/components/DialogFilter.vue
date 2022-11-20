<template>
  <q-dialog class="q-pa-none" maximized progress v-model="confirm">
    <q-card class="q-pa-md">
      <q-card-section class="">
        <q-icon
          class="back"
          name="clear"
          size="sm"
          color="primary"
          v-close-popup
          @click="emit('closed')"
        />
        <p class="q-mt-md q-mb-none text-h5 text-weight-medium">
          Filter pokemon list
        </p>
      </q-card-section>
      <q-card-section class="q-gutter-y-lg">
        <q-select
          v-model="movement"
          bg-color="secondary"
          label-color="dark"
          :options="options"
          label="Selec movement number"
          filled
          clearable
          transition-show="jump-up"
          transition-hide="jump-down"
          behavior="menu"
          @update:model-value="(val) => (movement = val)"
        />
        <q-select
          v-model="experience"
          bg-color="secondary"
          label-color="dark"
          :options="optExp"
          clearable
          label="Selec experience level"
          filled
          transition-show="jump-up"
          transition-hide="jump-down"
          behavior="menu"
          @update:model-value="(val) => (experience = val)"
        />
        <q-select
          v-model="type"
          bg-color="secondary"
          multiple
          max-values="5"
          label-color="dark"
          :options="typeOptions"
          label="Pokemon type"
          filled
          option-value="value"
          option-label="label"
          map-options
          emit-value
          use-chips
          transition-show="jump-up"
          transition-hide="jump-down"
          behavior="menu"
        >
          <template v-slot:selected-item="scope">
            <q-chip
              removable
              @remove="scope.removeAtIndex(scope.index)"
              :tabindex="scope.tabindex"
              dense
              clickable
              class="chip-select-type"
            >
              {{ scope.opt.label }}
            </q-chip>
          </template>
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <img :src="`./icons-type/${scope.opt.value}.png`" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ scope.opt.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-card-section>
      <q-card-actions class="absolute-bottom row" align="right">
        <div class="col q-px-sm">
          <q-btn
            class="full-width"
            size="lg"
            label="Cancel"
            text-color="dark-page"
            color="info"
            v-close-popup
            @click="emit('closed')"
          />
        </div>
        <div class="col q-px-sm">
          <q-btn
            class="full-width"
            size="lg"
            label="Filter"
            color="primary"
            v-close-popup
            @click="sendFilter"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import { usePokemon } from "stores/pokemon";
import typeOptions from "../helpers/typeOptions";
const store = usePokemon();
const confirm = ref(false);
const movement = ref(null);
const experience = ref(null);
const type = ref([]);
const options = [];
const optExp = [];
const emit = defineEmits(["resultMove", "closed"]);

for (let i = 0; i <= 200; i++) {
  options.push(+i);
}

for (let i = 0; i <= 500; i++) {
  optExp.push(+i);
}

const props = defineProps({
  openDialog: { type: Boolean },
});

watch(
  () => props.openDialog,
  (newVal) => {
    confirm.value = newVal;
  }
);

const sendFilter = () => {
  store.handleLoading(true);

  setTimeout(() => {
    store.setStatus(true);
    confirm.value = false;
    store.$patch((state) => {
      state.advanceFilter = {
        moves: movement.value,
        experience: experience.value,
        type: type.value,
      };
    });
    emit("resultMove");
  }, 500);
};
</script>
