<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    labels: {
      type: Array,
      default: () => []
    },
    xdata: {
      type: Array,
      default: () => []
    },
    tdata: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chart: null,
      color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
    }
  },
  watch: {
    tdata() {
      this.initChart()
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            textStyle: { color: '#fff' }
          }
        },
        grid: {
          left: '5%',
          right: '2%',
          borderWidth: 0,
          top: 50,
          bottom: 30,
          textStyle: { color: '#fff' }
        },
        legend: {
          x: '1%',
          top: '2',
          textStyle: { color: '#90979c' },
          data: this.labels
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          splitLine: { show: false },
          axisTick: { show: false },
          splitArea: { show: false },
          axisLabel: { interval: 0 },
          data: this.xdata
        }],
        yAxis: [{
          type: 'value',
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: { show: false },
          axisLabel: {
            interval: 0
          },
          splitArea: { show: false }
        }],
        series: this.createDate(this.tdata)
      })
    },
    createDate(list) {
      const ret = []
      const size = list.length
      for (let i = 0; i < size; i++) {
        ret.push({
          name: list[i].name,
          type: list[i].type,
          stack: 'total',
          symbolSize: 10,
          symbol: 'circle',
          data: list[i].data,
          itemStyle: {
            normal: {
              color: this.color[i],
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          }
        })
      }
      return ret
    }
  }
}
</script>
