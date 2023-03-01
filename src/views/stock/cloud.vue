<template>
  <div class="app-container">
    <div v-if="tdata.length > 0" class="filter-container div-float" style="float:right; right:50px;">
      <el-select v-model="ctype" class="filter-item" @change="handleSelect">
        <el-option v-for="item in coptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="cycle" class="filter-item" @change="handleSelect">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <chart :labels="labels" :xdata="xdata" :tdata="tdata" width="100%" height="100%" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { parseTime, reportCycle } from '@/utils'
import Chart from '@/components/Charts/Chart'
import { getGroupAllStorage } from '@/api/storage'
import { getStockReport } from '@/api/report'

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
      options: reportCycle,
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
  async created() {
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

    await this.getGroupAllStorage()
    this.$nextTick(() => {
      this.getStockReport()
    })
  },
  methods: {
    handleSelect() {
      this.getStockReport()
    },
    getStockReport() {
      switch (this.cycle) {
        case 1: // 日报
          this.getStockDayReport()
          break
        default:
          break
      }
    },
    getStockDayReport() {
      getStockReport({
        id: this.userdata.user.id,
        gid: this.userdata.group.id,
        type: this.ctype,
        cycle: 1
      }).then(response => {
        const tdata = [...this.tdata]
        const tsize = tdata.length
        tdata[0].data = Array(7).fill(0)
        for (let i = 1; i < tsize; i++) {
          tdata[i].data = [...tdata[0].data]
        }

        const size = this.xdata.length
        const data = response.data.data.list
        tdata.forEach(title => {
          if (title.id === 0) {
            return
          }
          data.forEach(v => {
            for (let i = 0; i < size; i++) {
              if (title.id === v.id && this.xdata[i].key === v.date) {
                tdata[0].data[i] += v.total
                tdata[title.idx].data[i] = v.total
                return
              }
            }
          })
        })
        this.tdata = tdata
      })
    },
    getGroupAllStorage() {
      getGroupAllStorage({
        id: this.userdata.user.id
      }).then(response => {
        const color = ['#ee6666', '#5470c6', '#fac858', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
        const list = response.data.data.list
        this.tdata = [{ id: 0, idx: 0, name: '全部', type: 'bar', yAxisIndex: 0, color: '#91cc75', data: [] }]
        const size = list.length
        for (let i = 0; i < size; i++) {
          this.tdata.push({ id: list[i].id, idx: i + 1, name: list[i].name, type: 'line', yAxisIndex: 0, color: color[i], data: [] })
        }

        // 左上标签
        this.labels = []
        this.tdata.forEach(v => {
          this.labels.push(v.name)
        })
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
