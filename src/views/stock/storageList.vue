<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="storage" style="width: 200px;" class="filter-item" @change="getStockList">
        <el-option v-for="item in soptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="ctype" style="width: 200px;" class="filter-item" @change="getStockList">
        <el-option v-for="item in coptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-input v-model="listQuery.search" placeholder="商品名称" style="width: 200px;" class="filter-item" @keyup.enter.native="getStockList" />
      <span style="color:#888" class="filter-item">截止 {{ listQuery.date }} 23:59:59</span>
    </div>

    <el-table v-loading="loading" :data="list" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="编号" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单位" width="180px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.unit }}克</span>
        </template>
      </el-table-column>
      <el-table-column label="数量" width="180px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.value }}件</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" width="180px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.price }}元</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getStockList" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import { getStockCommodity, getStockHalfgood, getStockOriginal, getStockStandard, getStockDestroy } from '@/api/stock'
import { getGroupAllStorage } from '@/api/storage'

export default {
  components: { Pagination },
  data() {
    return {
      userdata: {},
      list: null,
      total: 0,
      loading: false,
      listQuery: {
        id: 0,
        sid: 0,
        date: null,
        page: 1,
        limit: 20,
        search: null
      },
      storage: 0,
      soptions: [],
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
      }]
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
      this.listQuery.search = newVal
      this.getStockList()
    },
    create() {
      this.$message({ type: 'error', message: '不支持新建!' })
    }
  },
  created() {
    this.listQuery.id = this.$store.getters.userdata.user.id
    this.userdata = this.$store.getters.userdata
    const today = new Date()
    today.setDate(today.getDate() - 1)
    this.listQuery.date = parseTime(today, '{y}-{m}-{d}')
    this.getGroupStorage()
  },
  methods: {
    getGroupStorage() {
      getGroupAllStorage({
        id: this.userdata.user.id
      }).then(response => {
        if (response.data.data.list && response.data.data.list.length > 0) {
          response.data.data.list.forEach(v => {
            this.soptions.push({ value: v.id, label: v.name })
          })
          this.storage = response.data.data.list[0].id
          this.getStockList()
        }
      })
    },
    getStockList() {
      this.listQuery.sid = this.storage
      switch (this.ctype) {
        case 1:
          this.getStockCommodity()
          break
        case 2:
          this.getStockHalfgood()
          break
        case 3:
          this.getStockOriginal()
          break
        case 4:
          this.getStockStandard()
          break
        case 5:
          this.getStockDestroy()
          break
      }
    },
    getStockCommodity() {
      this.loading = true
      getStockCommodity(
        this.listQuery
      ).then(response => {
        this.total = response.data.data.total
        this.list = response.data.data.list
        this.loading = false
      }).catch(error => {
        this.loading = false
        Promise.reject(error)
      })
    },
    getStockHalfgood() {
      this.loading = true
      getStockHalfgood(
        this.listQuery
      ).then(response => {
        this.total = response.data.data.total
        this.list = response.data.data.list
        this.loading = false
      }).catch(error => {
        this.loading = false
        Promise.reject(error)
      })
    },
    getStockOriginal() {
      this.loading = true
      getStockOriginal(
        this.listQuery
      ).then(response => {
        this.total = response.data.data.total
        this.list = response.data.data.list
        this.loading = false
      }).catch(error => {
        this.loading = false
        Promise.reject(error)
      })
    },
    getStockStandard() {
      this.loading = true
      getStockStandard(
        this.listQuery
      ).then(response => {
        this.total = response.data.data.total
        this.list = response.data.data.list
        this.loading = false
      }).catch(error => {
        this.loading = false
        Promise.reject(error)
      })
    },
    getStockDestroy() {
      this.loading = true
      getStockDestroy(
        this.listQuery
      ).then(response => {
        this.total = response.data.data.total
        this.list = response.data.data.list
        this.loading = false
      }).catch(error => {
        this.loading = false
        Promise.reject(error)
      })
    }
  }
}
</script>
