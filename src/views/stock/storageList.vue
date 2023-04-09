<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.sid" style="width: 200px;" class="filter-item" @change="handleSelect">
        <el-option v-for="item in soptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="listQuery.ctype" style="width: 100px;" class="filter-item" @change="handleSelect">
        <el-option v-for="item in coptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-date-picker v-model="date" type="date" class="filter-item" style="width: 150px;" @change="handleSelect" />
      <el-input v-model="listQuery.search" placeholder="商品名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleSelect" />
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
      <el-table-column label="货值" width="180px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.price }}元</span>
        </template>
      </el-table-column>
      <el-table-column label="重量" width="180px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.weight / 1000 }}kg</span>
        </template>
      </el-table-column>
      <el-table-column label="件数" width="180px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.value }}件</span>
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
import { getStockList } from '@/api/stock'
import { getGroupAllStorage } from '@/api/storage'

export default {
  components: { Pagination },
  data() {
    return {
      userdata: {},
      soptions: [],
      coptions: [{
        value: 4, label: '标品'
      }, {
        value: 1, label: '商品'
      }, {
        value: 2, label: '半成品'
      }, {
        value: 3, label: '原料'
      }],
      date: new Date(),
      list: null,
      total: 0,
      loading: false,
      listQuery: {
        id: 0,
        sid: 0,
        ctype: 1,
        page: 1,
        limit: 20,
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
      this.getStockList()
    },
    create() {
      this.$message({ type: 'error', message: '不支持新建!' })
    }
  },
  created() {
    this.userdata = this.$store.getters.userdata
    this.listQuery.id = this.userdata.user.id
    this.listQuery.date = parseTime(this.date, '{y}-{m}-{d}')
    this.getGroupStorage()
  },
  methods: {
    handleSelect() {
      this.listQuery.page = 1
      this.listQuery.limit = 20
      this.listQuery.date = parseTime(this.date, '{y}-{m}-{d}')
      this.getStockList()
    },
    getGroupStorage() {
      getGroupAllStorage({
        id: this.userdata.user.id
      }).then(response => {
        if (response.data.data.list && response.data.data.list.length > 0) {
          response.data.data.list.forEach(v => {
            this.soptions.push({ value: v.id, label: v.name })
          })
          this.listQuery.sid = response.data.data.list[0].id
          this.getStockList()
        }
      })
    },
    getStockList() {
      this.loading = true
      getStockList(
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
