<template>
  <div class="app-container">
    <div v-if="tdata.length > 0" class="filter-container div-float" style="float:right; right:50px;">
      <el-select v-model="ctype" class="filter-item">
        <el-option v-for="item in coptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="cycle" class="filter-item">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <chart :labels="labels" :xdata="xdata" :tdata="tdata" width="100%" height="100%" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { parseTime } from '@/utils'
import Chart from '@/components/Charts/Chart'
import { getStorageReport } from '@/api/report'

export default {
  components: { Chart },
  data() {
    return {
      userdata: {},
      ctype: 1,
      coptions: [{
        value: 1, label: '商品'
      }, {
        value: 2, label: '半成品'
      }, {
        value: 3, label: '原料'
      }, {
        value: 4, label: '标品'
      }, {
        value: 5, label: '废料'
      }],
      cycle: 1,
      options: [{
        value: 1, label: '日报'
      }, {
        value: 2, label: '周报'
      }, {
        value: 3, label: '月报'
      }, {
        value: 4, label: '年报'
      }],
      labels: [],
      xdata: [],
      tdata: []
    }
  },
  computed: {
    ...mapState({
      search: state => state.header.search,
      create: state => state.header.create
    })
  },
  watch: {
    search(newVal, oldVal) {
      this.$message({ type: 'error', message: '不支持搜索!' })
    },
    create() {
      this.$message({ type: 'error', message: '不支持新建!' })
    }
  },
  created() {
    this.userdata = this.$store.getters.userdata

    // x轴
    this.xdata = []
    const date = new Date()
    date.setDate(date.getDate() - 7)
    for (let i = 0; i < 7; i++) {
      this.xdata.push({
        key: parseTime(date, '{y}{m}{d}'),
        value: parseTime(date, '{m}月{d}日')
      })
      date.setDate(date.getDate() + 1)
    }

    // 数据
    this.tdata = [{
      name: '仓储进货订单数', type: 'line', yAxisIndex: 1, color: '#91cc75', data: []
    }, {
      name: '仓储退货订单数', type: 'line', yAxisIndex: 1, color: '#ee6666', data: []
    }, {
      name: '仓储进货商品数', type: 'bar', yAxisIndex: 0, color: '#5470c6', data: []
    }, {
      name: '仓储退货商品数', type: 'bar', yAxisIndex: 0, color: '#fac858', data: []
    }]

    // 左上标签
    this.labels = []
    this.tdata.forEach(v => {
      this.labels.push(v.name)
    })
    this.getStorageReport()
  },
  methods: {
    getStorageReport() {
      switch (this.cycle) {
        case 1: // 日报
          this.getStorageDayReport()
          break
        default:
          break
      }
    },
    getStorageDayReport() {
      getStorageReport({
        id: this.userdata.user.id,
        gid: this.userdata.group.id,
        cycle: 1
      }).then(response => {
        const tdata = [...this.tdata]
        tdata[0].data = Array(7).fill(0)
        tdata[1].data = [...tdata[0].data]
        tdata[2].data = [...tdata[0].data]
        tdata[3].data = [...tdata[0].data]
        const size = this.xdata.length
        const data = response.data.data.list
        data.forEach(v => {
          for (let i = 0; i < size; i++) {
            if (this.xdata[i].key === v.date) {
              if (v.type === 2) {
                tdata[0].data[i] = v.num
                tdata[2].data[i] = v.total
              } else if (v.type === 1) {
                tdata[1].data[i] = v.num
                tdata[3].data[i] = v.total
              }
              return
            }
          }
        })
        this.tdata = tdata
      })
    }
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
