<template>
  <div class="app-container">
    <span class="firstLine">{{ userdata.user.name }} ( {{ userdata.group.name }} ) : 您好, 欢迎使用集数助手！</span>
    <!-- 销售 -->
    <el-row :gutter="40" class="panel-group">
      <el-col v-for="row in row1" :key="row.id" :item="row" :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleJump(row)">
          <div class="card-panel-icon-wrapper" :class="row.class">
            <svg-icon :icon-class="row.icon" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">{{ row.title }}</div>
            <div class="card-panel-num">{{ row.data }}</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 订单/库存 -->
    <el-row :gutter="40" class="panel-group">
      <el-col v-for="row in row2" :key="row.id" :item="row" :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleJump(row)">
          <div class="card-panel-icon-wrapper" :class="row.class">
            <svg-icon :icon-class="row.icon" class-name="card-panel-icon" />
          </div>
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
      row2: []
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
    this.roles = this.$store.getters.roles
    this.getTodayReport()
    this.row1 = [{
      id: 1, icon: 'money', class: 'icon-1', title: '朴朴', data: 0
    }, {
      id: 2, icon: 'money', class: 'icon-2', title: '美团', data: 0
    }, {
      id: 3, icon: 'money', class: 'icon-3', title: '拼多多', data: 0
    }]
    this.row2 = [{
      id: 5, icon: 'guide', class: 'icon-1', role: 201, url: '/agreement/report', title: '履约订单', data: 0
    }, {
      id: 6, icon: 'nested', class: 'icon-2', role: 601, url: '/product/report', title: '生产订单', data: 0
    }, {
      id: 7, icon: 'form', class: 'icon-3', role: 801, url: '/storage/report', title: '进货订单', data: 0
    }, {
      id: 8, icon: 'dashboard', class: 'icon-4', role: 802, url: '/storage/stock', title: '库存总数', data: 0
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
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-1 {
        background: #40c9c6;
      }

      .icon-2 {
        background: #36a3f7;
      }

      .icon-3 {
        background: #f4516c;
      }

      .icon-4 {
        background: #34bfa3
      }
    }

    .icon-1 {
      color: #40c9c6;
    }

    .icon-2 {
      color: #36a3f7;
    }

    .icon-3 {
      color: #f4516c;
    }

    .icon-4 {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

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

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
