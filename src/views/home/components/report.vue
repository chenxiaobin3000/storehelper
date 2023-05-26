<template>
  <div class="app-container">
    <span class="firstLine">{{ userdata.user.name }} ( {{ userdata.group.name }} ) : 您好, 欢迎使用集数助手！</span>
    <!-- 第一行 -->
    <el-row :gutter="40" class="panel-group">
      <el-col v-for="row in row1" :key="row.id" :item="row" :xs="4" :sm="4" :lg="4" class="card-panel-col">
        <div class="card-panel" @click="handleJump(row)">
          <div class="card-panel-description">
            <div class="card-panel-text">{{ row.label }}</div>
            <div class="card-panel-num">{{ row.data }}</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 第二行 -->
    <el-row :gutter="40" class="panel-group">
      <el-col v-for="row in row2" :key="row.id" :item="row" :xs="4" :sm="4" :lg="4" class="card-panel-col">
        <div class="card-panel" @click="handleJump(row)">
          <div class="card-panel-description">
            <div class="card-panel-text">{{ row.title }}</div>
            <div class="card-panel-num">{{ row.data }}</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 第三行 -->
    <el-row :gutter="40" class="panel-group">
      <el-col v-for="row in row3" :key="row.id" :item="row" :xs="4" :sm="4" :lg="4" class="card-panel-col">
        <div class="card-panel" @click="handleJump(row)">
          <div class="card-panel-description">
            <div class="card-panel-text">{{ row.title }}</div>
            <div class="card-panel-num">{{ row.data }}</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getTodayReport } from '@/api/report'
import { filterMarket } from '@/utils/market-data'

export default {
  data() {
    return {
      userdata: {},
      roles: [],
      market: null,
      agreement: null,
      product: null,
      storage: null,
      stock: null,
      row1: [],
      row2: [],
      row3: []
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
    this.market = filterMarket(this.userdata.market, false)
    this.roles = this.$store.getters.roles
    this.getTodayReport()
    this.market.forEach(v => {
      v.data = 0
      this.row1.push(v)
    })
    this.row2 = [{
      id: 10, role: 701, url: '/market/report', title: '平台销售', data: 0
    }, {
      id: 11, role: 702, url: '/market/stockReport', title: '平台库存', data: 0
    }, {
      id: 12, role: 703, url: '/offline/report', title: '线下销售', data: 0
    }, {
      id: 13, role: 704, url: '/storage/stockReport', title: '仓储库存', data: 0
    }]
    this.row3 = [{
      id: 14, role: 705, url: '/purchase/report', title: '采购数据', data: 0
    }, {
      id: 15, role: 706, url: '/storage/report', title: '仓储数据', data: 0
    }, {
      id: 16, role: 707, url: '/product/report', title: '生产数据', data: 0
    }, {
      id: 17, role: 708, url: '/agreement/report', title: '履约数据', data: 0
    }, {
      id: 18, role: 709, url: '/transport/report', title: '物流数据', data: 0
    }]
  },
  methods: {
    getTodayReport() {
      getTodayReport({
        id: this.userdata.user.id,
        gid: this.userdata.group.id
      }).then(response => {
        const data = response.data.data
        let total = 0
        data.stock.forEach(v => {
          total += v.total
        })
        // data.market
        this.row2[0].data = data.agreement.total
        this.row2[1].data = data.product.total
        this.row2[2].data = data.storage.total
        this.row2[3].data = total
      })
    },
    handleJump(row) {
      if (this.roles.some(role => row.role === role)) {
        this.$router.push({ path: row.url })
      } else {
        this.$message({ type: 'error', message: '您没有访问权限，请联系管理员!' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 32px;
  color: #666;

  .firstLine {
    padding-left: 2%;
  }
}

.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #f6f6f6;
    box-shadow: 8px 8px 5px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    .card-panel-description {
      font-weight: bold;
      margin: 26px;
      margin-left: 36px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }
}
</style>
