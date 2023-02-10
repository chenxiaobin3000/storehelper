<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="ctype" class="filter-item" @change="handleSelect">
        <el-option v-for="item in coptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-date-picker v-model="date" type="date" class="filter-item" @change="handleSelect" />
    </div>

    <el-table v-loading="loading" :data="list" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="编号" width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="内部名称" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.price }}元</span>
        </template>
      </el-table-column>
      <el-table-column label="平台名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mprice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销量" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.value }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getCommodityList" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import { getMarketCommDetail, getMarketStanDetail } from '@/api/market'

export default {
  components: { Pagination },
  data() {
    return {
      marketId: 1, // pdd
      userdata: {},
      ctype: 1,
      coptions: [{
        value: 1, label: '商品'
      }, {
        value: 4, label: '标品'
      }],
      date: new Date(),
      list: null,
      total: 0,
      loading: false,
      listQuery: {
        id: 0,
        page: 1,
        limit: 20,
        mid: 0,
        date: null,
        search: null
      }
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
      this.getCommodityList()
    },
    create() {
      this.$message({ type: 'error', message: '不支持新建!' })
    }
  },
  created() {
    this.userdata = this.$store.getters.userdata
    this.listQuery.id = this.userdata.user.id
    this.listQuery.mid = this.marketId
    this.listQuery.date = parseTime(this.date, '{y}-{m}-{d}')
    this.getCommodityList()
  },
  methods: {
    handleSelect() {
      this.listQuery.page = 1
      this.listQuery.limit = 20
      this.listQuery.date = parseTime(this.date, '{y}-{m}-{d}')
      this.getCommodityList()
    },
    getCommodityList() {
      this.loading = true
      if (this.ctype === 1) {
        getMarketCommDetail(
          this.listQuery
        ).then(response => {
          this.total = response.data.data.total
          this.list = response.data.data.list
          this.loading = false
        }).catch(error => {
          this.loading = false
          Promise.reject(error)
        })
      } else {
        getMarketStanDetail(
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
}
</script>
