<template>
  <div class="echarts-index" ref="echartsRef"></div>
</template>

<script setup>
import { onMounted, ref, toRefs } from 'vue';
import * as echarts from 'echarts';
import { defineProps } from 'vue';

// 定义props
const props = defineProps({
  options: Object
});

const { options } = toRefs(props);

const echartsRef = ref(null);

onMounted(() => {
  const myChart = echarts.init(echartsRef.value);
  myChart.setOption(options.value); // 使用props赋值options
});
</script>

<style scoped>
.echarts-index {
  width: 400px;
  height: 300px;
}
</style>
