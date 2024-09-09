<script setup lang="ts">
import * as echarts from 'echarts'
import {onMounted, ref, watch} from 'vue'



// 接口定义
const props = withDefaults(defineProps<{
  data?: any
}>(), {

})

/** ===== 图表初始化-start ===== **/
const charts = ref()
function optionSet(item: any) {
  const option = {
    title: {
      text: '阅读量趋势',
      left: 'top'
    },
    xAxis: {
      type: 'category',
      data: ['1: 00', '2: 00', '3: 00', '4: 00', '5: 00', '6: 00', '7: 00', '8: 00', '9: 00', '10: 00', '11: 00', '12: 00']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320, 1230, 1200, 1000, 900, 800],
        type: 'line',
        smooth: true
      }
    ],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    }
  };
  item.setOption(option)
}
function initCharts() {
  const read = echarts.init(charts.value)
  optionSet(read)
}
onMounted(() => {
  initCharts()
})
watch(() => props.data, ()=> {
  initCharts()
})
/** ===== 图表初始化-end ===== **/
</script>

<template>
  <div ref="charts" class="w-full h-full flex flex-col" />
</template>

<style scoped>

</style>
