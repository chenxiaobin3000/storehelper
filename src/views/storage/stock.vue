<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.sid" style="width: 200px;" class="filter-item" @change="handleSelect">
        <el-option v-for="item in storages" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <el-date-picker v-model="date" type="date" class="filter-item" style="width: 150px;" @change="handleSelect" />
      <el-button type="primary" size="normal" style="float:right;width:100px;margin-left:20px" @click="handleExcel()">批量导入</el-button>
      <el-button type="primary" size="normal" style="float:right;width:100px" @click="handleDownload()">模板下载</el-button>
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
      <el-table-column label="重量" width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.weight / 1000 }}kg</span>
        </template>
      </el-table-column>
      <el-table-column label="箱规" width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.norm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="份数" width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.value }}件</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getStockList" />

    <el-dialog title="导入Excel" :visible.sync="dialogExcelVisible">
      <upload-excel-component :on-success="handleSuccess" width="90%" line-height="290px" height="300px" />
      <br>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import UploadExcelComponent from '@/components/UploadExcel'
import { setStockList, getStockList } from '@/api/stock'
import { getGroupAllStorage } from '@/api/storage'

export default {
  components: { Pagination, UploadExcelComponent },
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
        sid: 0,
        page: 1,
        limit: 10,
        date: null,
        search: null
      },
      dialogExcelVisible: false
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
    this.listQuery.date = parseTime(this.date, '{y}-{m}-{d}')
    this.getGroupStorage()
  },
  methods: {
    handleSelect() {
      this.listQuery.page = 1
      this.listQuery.limit = 10
      this.listQuery.date = parseTime(this.date, '{y}-{m}-{d}')
      this.getStockList()
    },
    handleSuccess({ results, header }) {
      const codes = []
      const names = []
      const prices = []
      const weights = []
      const norms = []
      const values = []
      const idName = '编号'
      const commName = '商品名称'
      const priceName = '总价'
      const weightName = '总重量'
      const normName = '箱规'
      const valueName = '份数'
      results.forEach(v => {
        if (v[idName] && v[idName] > 0) {
          codes.push(v[idName])
          names.push(v[commName])
          prices.push(v[priceName])
          weights.push(v[weightName] * 1000)
          norms.push(v[normName])
          values.push(v[valueName])
        }
      })
      setStockList({
        id: this.listQuery.id,
        sid: this.listQuery.sid,
        date: this.listQuery.date + ' 00:00:00',
        codes: codes,
        names: names,
        prices: prices,
        weights: weights,
        norms: norms,
        values: values
      }).then(response => {
        this.$message({ type: 'success', message: '更新成功!' })
        this.getStockList()
        this.dialogExcelVisible = false
      })
    },
    getGroupStorage() {
      getGroupAllStorage({
        id: this.userdata.user.id
      }).then(response => {
        const data = response.data.data
        if (data.list && data.list.length > 0) {
          data.list.forEach(v => {
            this.storages.push({ id: v.id, label: v.name })
          })
          this.listQuery.sid = data.list[0].id
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
    },
    handleDownload() {
      const atag = document.createElement('a')
      atag.href = 'http://' + process.env.VUE_APP_BASE_API
      atag.href = atag.href.substring(0, atag.href.length - 4) + '库存模板.xlsx'
      atag.click()
    },
    handleExcel() {
      this.dialogExcelVisible = true
    }
  }
}
</script>
