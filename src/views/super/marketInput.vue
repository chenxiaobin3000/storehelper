<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.mid" class="filter-item" @change="handleSelect">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="listQuery.ctype" class="filter-item" @change="handleSelect">
        <el-option v-for="item in coptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
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
      <el-table-column label="价格" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.price }}元</span>
        </template>
      </el-table-column>
      <el-table-column label="平台名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" width="100px" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.mname" />
        </template>
      </el-table-column>
      <el-table-column label="销量" width="120px" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.mname" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            更新
          </el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getCommodityList" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination'
import { setMarketCommDetail, delMarketCommDetail, getMarketCommDetail, setMarketStanDetail, delMarketStanDetail, getMarketStanDetail } from '@/api/market'

export default {
  components: { Pagination },
  data() {
    return {
      userdata: {},
      options: [{
        value: 1, label: '拼多多'
      }, {
        value: 2, label: '美团'
      }, {
        value: 3, label: '快驴'
      }],
      coptions: [{
        value: 1, label: '商品'
      }, {
        value: 4, label: '标品'
      }],
      list: null,
      total: 0,
      loading: false,
      listQuery: {
        id: 0,
        page: 1,
        limit: 20,
        mid: 1,
        ctype: 1,
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
    this.getList()
  },
  methods: {
    handleSelect() {
      this.listQuery.page = 1
      this.listQuery.limit = 20
      this.getCommodityList()
    },
    getCommodityList() {
      this.loading = true
      if (this.listQuery.ctype === 1) {
        getMarketCommodity(
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
        getMarketStandard(
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
    },
  }
}
</script>
