<template>
  <div class="app-container">
    <div class="filter-container div-float" style="float:right; right:50px;">
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
import { getAgreementReport } from '@/api/report'

export default {
  components: { Chart },
  data() {
    return {
      userdata: {},
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
      name: '履约退货订单数', type: 'bar', data: []
    }, {
      name: '履约发货订单数', type: 'bar', data: []
    }, {
      name: '履约退货商品数', type: 'line', data: []
    }, {
      name: '履约发货商品数', type: 'line', data: []
    }]

    // 左上标签
    this.labels = []
    this.tdata.forEach(v => {
      this.labels.push(v.name)
    })
    this.getAgreementReport()
  },
  methods: {
    getAgreementReport() {
      switch (this.cycle) {
        case 1: // 日报
          this.getAgreementDayReport()
          break
        default:
          break
      }
    },
    getAgreementDayReport() {
      this.tdata[0].data = [0, 0, 0, 0, 0, 0, 0]
      this.tdata[1].data = [0, 0, 0, 0, 0, 0, 0]
      this.tdata[2].data = [0, 0, 0, 0, 0, 0, 0]
      this.tdata[3].data = [0, 0, 0, 0, 0, 0, 0]
      getAgreementReport({
        id: this.userdata.user.id,
        gid: this.userdata.group.id,
        cycle: 1
      }).then(response => {
        const size = this.xdata.length
        const data = response.data.data.list
        data.forEach(v => {
          for (let i = 0; i < size; i++) {
            if (this.xdata[i].key === v.date) {
              if (v.type === 5) {
                this.tdata[0].data[i] = v.num
                this.tdata[2].data[i] = v.total
              } else if (v.type === 6) {
                this.tdata[1].data[i] = v.num
                this.tdata[3].data[i] = v.total
              }
              return
            }
          }
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
