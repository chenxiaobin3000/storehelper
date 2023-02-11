<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.mid" class="filter-item" @change="handleSelect">
        <el-option v-for="item in moptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
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
      <el-table-column label="价格" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.price }}元</span>
        </template>
      </el-table-column>
      <el-table-column label="平台名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mname }} </span>
          <el-button icon="el-icon-document-copy" size="mini" circle @click="handleCopy(row)" />
        </template>
      </el-table-column>
      <el-table-column label="价格" width="100px" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.mprice" />
        </template>
      </el-table-column>
      <el-table-column label="销量" width="120px" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.value" />
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
import { parseTime, filterMarket } from '@/utils'
import Pagination from '@/components/Pagination'
import { setMarketCommDetail, delMarketCommDetail, getMarketCommDetail, setMarketStanDetail, delMarketStanDetail, getMarketStanDetail } from '@/api/market'

export default {
  components: { Pagination },
  data() {
    return {
      userdata: {},
      moptions: [],
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
        mid: 1,
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
    this.moptions = filterMarket(this.userdata.market, false)
    this.listQuery.id = this.userdata.user.id
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
    },
    handleCopy(row) {
      const temp = {
        id: this.listQuery.id,
        gid: this.userdata.group.id,
        mid: this.listQuery.mid,
        did: 0,
        cid: row.cid,
        value: row.value,
        price: row.mprice,
        date: this.listQuery.date
      }
      if (this.ctype === 1) {
        setMarketCommDetail(temp).then(response => {
          this.$message({ type: 'success', message: '复制成功!' })
          this.getCommodityList()
        })
      } else {
        setMarketStanDetail(temp).then(response => {
          this.$message({ type: 'success', message: '复制成功!' })
          this.getCommodityList()
        })
      }
    },
    handleUpdate(row) {
      const temp = {
        id: this.listQuery.id,
        gid: this.userdata.group.id,
        mid: this.listQuery.mid,
        did: row.id ? row.id : 0,
        cid: row.cid,
        value: row.value,
        price: row.mprice,
        date: this.listQuery.date
      }
      if (this.ctype === 1) {
        setMarketCommDetail(temp).then(response => {
          this.$message({ type: 'success', message: '修改成功!' })
          this.getCommodityList()
        })
      } else {
        setMarketStanDetail(temp).then(response => {
          this.$message({ type: 'success', message: '修改成功!' })
          this.getCommodityList()
        })
      }
    },
    handleDelete(row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const temp = {
          id: this.listQuery.id,
          gid: this.userdata.group.id,
          did: row.id
        }
        if (this.ctype === 1) {
          delMarketCommDetail(temp).then(response => {
            this.$message({ type: 'success', message: '删除成功!' })
            this.getCommodityList()
          })
        } else {
          delMarketStanDetail(temp).then(response => {
            this.$message({ type: 'success', message: '删除成功!' })
            this.getCommodityList()
          })
        }
      })
    }
  }
}
</script>
