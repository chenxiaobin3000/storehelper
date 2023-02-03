<template>
  <div class="app-container">
    <div class="filter-container div-float">
      <el-select v-model="cycle" style="width: 200px;" class="filter-item">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="cid" style="width: 200px;" class="filter-item">
        <el-option v-for="item in coptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <chart :labels="labels" :xdata="xdata" :tdata="tdata" width="100%" height="100%" />
  </div>
</template>

<script>
import Chart from '@/components/Charts/Chart'

export default {
  components: { Chart },
  data() {
    return {
      cycle: 1,
      options: [{
        value: 1, label: '日报'
      }, {
        value: 2, label: '周报'
      }, {
        value: 3, label: '月报'
      }, {
        value: 5, label: '年报'
      }],
      cid: 0,
      coptions: [{ value: 0, label: '全部' }],
      labels: [],
      xdata: [],
      tdata: []
    }
  },
  created() {
    this.labels = ['进货', '退货', '库存']
    this.xdata = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    this.tdata = [{
      name: '进货',
      type: 'bar',
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
      ] }, {
      name: '退货',
      type: 'bar',
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
        381
      ] }, {
      name: '库存',
      type: 'line',
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

.div-float {
  position: absolute;
  margin-top: 0;
  margin-left: 200px;
  z-index: 1;
}
</style>
