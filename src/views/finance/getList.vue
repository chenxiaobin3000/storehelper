<template>
  <div class="app-container">
    <el-table ref="table" v-loading="loading" :data="list" :height="tableHeight" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="动作" width="180px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.action }}</span>
        </template>
      </el-table-column>
      <el-table-column label="金额" align="center">
        <template slot-scope="{row}">
          <span>{{ row.value }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作人" width="180px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.user }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.time }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" ref="pagination" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getFinance" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination'
import { getFinance } from '@/api/finance'

export default {
  components: { Pagination },
  data() {
    return {
      tableHeight: 600,
      list: null,
      total: 0,
      loading: false,
      listQuery: {
        id: 0,
        page: 1,
        limit: 10,
        action: 0
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
      this.$message({ type: 'error', message: '不支持搜索!' })
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
    this.listQuery.id = this.$store.getters.userdata.user.id
    this.getFinance()
  },
  methods: {
    getFinance() {
      this.loading = true
      getFinance(
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
