<template>
  <div class="app-container">
    <chart :series="series" height="100%" width="100%" />
  </div>
</template>

<script>
import Chart from '@/components/Charts/Chart'

export default {
  components: { Chart },
  data() {
    return {
      series: []
    }
  },
  created() {
    this.series = [{
      name: 'female',
      type: 'bar',
      stack: 'total',
      barMaxWidth: 35,
      barGap: '10%',
      itemStyle: {
        normal: {
          color: 'rgba(255,144,128,1)',
          label: {
            show: true,
            textStyle: { color: '#fff' },
            position: 'insideTop',
            formatter(p) {
              return p.value > 0 ? p.value : ''
            }
          }
        }
      },
      data: [
        709,
        1917,
        2455,
        2610,
        1719,
        1433,
        1544,
        3285,
        5208,
        3372,
        2484,
        4078
      ]
    }, {
      name: 'male',
      type: 'bar',
      stack: 'total',
      itemStyle: {
        normal: {
          color: 'rgba(0,191,183,1)',
          barBorderRadius: 0,
          label: {
            show: true,
            position: 'top',
            formatter(p) {
              return p.value > 0 ? p.value : ''
            }
          }
        }
      },
      data: [
        327,
        1776,
        507,
        1200,
        800,
        482,
        204,
        1390,
        1001,
        951,
        381,
        220
      ]
    }, {
      name: 'average',
      type: 'line',
      stack: 'total',
      symbolSize: 10,
      symbol: 'circle',
      itemStyle: {
        normal: {
          color: 'rgba(252,230,48,1)',
          barBorderRadius: 0,
          label: {
            show: true,
            position: 'top',
            formatter(p) {
              return p.value > 0 ? p.value : ''
            }
          }
        }
      },
      data: [
        1036,
        3693,
        2962,
        3810,
        2519,
        1915,
        1748,
        4675,
        6209,
        4323,
        2865,
        4298
      ]
    }]
  },
  methods: {
  }
}
</script>

<style scoped>
.app-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
