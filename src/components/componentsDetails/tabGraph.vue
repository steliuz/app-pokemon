<template>
  <div class="col-12">
    <h5 class="text-title-blue text-weight-bold q-mb-xs">Base Stats</h5>
    <div class="row">
      <div class="col-3">
        <ul class="text-dark">
          <ol v-for="(item, index) in stats" :key="index">
            {{
              item
            }}
          </ol>
        </ul>
      </div>
      <div class="col-9">
        <q-card-section
          class="q-pa-none echarts"
          style="margin-top: 0"
          v-if="showChart"
        >
          <IEcharts :option="barChartOption" />
        </q-card-section>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import IEcharts from "vue3-echarts-v3/src/full.js";
import { usePokemon } from "stores/pokemon";
const store = usePokemon();

const props = defineProps(["data"]);

let stats = ["Speed", "SpDefense", "SpAttack", "Defense", "Attack", "HP"];

const dataStats = ref();

let showChart = ref(false);
let barChartOption = ref();

watch(
  () => props.data,
  (newVal) => {
    dataStats.value = newVal.stats;
    let data = [];
    dataStats.value.map((v) => {
      data.push(Number(v.base_stat));
    });
    store.setStats(data);
  }
);

const openPokemon = () => {
  barChartOption.value = {
    showChart: true,
    color: ["#072ac8"],
    grid: {},
    legend: {},
    tooltip: { show: true },
    xAxis: {},
    yAxis: {
      type: "category",
      data: ["", "", "", "", "", ""],
    },
    series: [
      {
        type: "bar",
        data: store.getStats,
        itemStyle: {
          borderWidth: 18,
          borderColor: "#072ac8",
        },
      },
    ],
  };
  showChart.value = true;
};

onMounted(() => {
  setTimeout(() => {
    openPokemon();
  }, 1000);
});
</script>
