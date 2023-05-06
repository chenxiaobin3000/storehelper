<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.aid" style="width: 200px;" class="filter-item" @change="handleSelect">
        <el-option v-for="item in aoptions" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <el-date-picker v-model="date" type="date" class="filter-item" style="width: 150px;" @change="handleSelect" />
    </div>

    <el-table ref="table" v-loading="loading" :data="list" :height="tableHeight" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="编号" width="120px" align="center">
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
      <el-table-column label="份数" width="160px" align="center">
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
import { getCloudList } from '@/api/stock'
import { getMarketAllAccount } from '@/api/market'

export default {
  components: { Pagination },
  data() {
    return {
      tableHeight: 600,
      userdata: {},
      storages: [],
      date: new Date(),
      list: null,
      total: 0,
      loading: false,
      listQuery: {
        id: 0,
        gid: 0,
        aid: 0,
        page: 1,
        limit: 10,
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
      this.handleSelect()
    },
    create() {
      this.$message({ type: 'error', message: '不支持新建!' })
    }
  },
  mounted: function() {
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 78
    }, 1000)
  },
  created() {
    this.userdata = this.$store.getters.userdata
    this.listQuery.id = this.userdata.user.id
    this.listQuery.gid = this.userdata.group.id
    this.listQuery.date = parseTime(this.date, '{y}-{m}-{d}')
    this.getMarketAllAccount()
  },
  methods: {
    handleSelect() {
      this.listQuery.page = 1
      this.listQuery.limit = 10
      this.listQuery.date = parseTime(this.date, '{y}-{m}-{d}')
      this.getCloudList()
    },
    getMarketAllAccount() {
      getMarketAllAccount({
        id: this.listQuery.id,
        gid: this.listQuery.gid
      }).then(response => {
        this.aoptions = []
        const list = response.data.data.list
        if (list.length > 0) {
          list.forEach(v => {
            const data = { id: v.id, label: v.account }
            this.aoptions.push(data)
          })
          this.listQuery.aid = this.aoptions[0].id
          this.getCloudList()
        }
      })
    },
    getCloudList() {
      this.loading = true
      getCloudList(
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
