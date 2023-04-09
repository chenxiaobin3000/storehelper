<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="ctype" class="filter-item" @change="handleSelect">
        <el-option v-for="item in coptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="listQuery.sid" class="filter-item" @change="handleCloudSelect">
        <el-option v-for="item in soptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <span class="filter-item" style="color:#606266"> 账号: {{ account }}, 子账号:</span>
      <el-select v-model="listQuery.asid" class="filter-item" @change="handleSelect">
        <el-option v-for="item in asoptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-date-picker v-model="date" type="date" class="filter-item" style="width: 150px;" @change="handleSelect" />
    </div>

    <el-table v-loading="loading" :data="list" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="编号" width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ccode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.cname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.cremark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="成本" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sprice }}元</span>
        </template>
      </el-table-column>
      <el-table-column label="库存" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.svalue }}</span>
        </template>
      </el-table-column>
      <el-table-column label="平台编号" width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mcode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="平台名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mname }} </span>
        </template>
      </el-table-column>
      <el-table-column label="平台备注" width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mremark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预警" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.alarm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mprice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销量" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mvalue }}</span>
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
import { getMarketStorageAccount, getMarketSubAccount } from '@/api/dock'
import { getGroupAllStorage } from '@/api/storage'

export default {
  components: { Pagination },
  data() {
    return {
      userdata: {},
      soptions: [],
      asoptions: [],
      account: '',
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
        gid: 0,
        page: 1,
        limit: 20,
        sid: 0,
        aid: 0,
        asid: 0,
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
    this.listQuery.gid = this.userdata.group.id
    this.listQuery.date = parseTime(this.date, '{y}-{m}-{d}')
    this.getGroupAllStorage()
  },
  methods: {
    handleSelect() {
      this.listQuery.page = 1
      this.listQuery.limit = 20
      this.listQuery.date = parseTime(this.date, '{y}-{m}-{d}')
      this.getCommodityList()
    },
    handleCloudSelect() {
      this.listQuery.page = 1
      this.listQuery.limit = 20
      this.getMarketStorageAccount()
    },
    getMarketSubAccount() {
      getMarketSubAccount({
        id: this.listQuery.id,
        gid: this.listQuery.gid,
        aid: this.listQuery.aid
      }).then(response => {
        if (response.data.data.list && response.data.data.list.length > 0) {
          this.asoptions = []
          response.data.data.list.forEach(v => {
            this.asoptions.push({ value: v.id, label: v.account })
          })
          this.listQuery.asid = this.asoptions[0].value
        } else {
          this.listQuery.asid = 0
          this.asoptions = [{ value: 0, label: '无' }]
        }
        this.listQuery.date = parseTime(this.date, '{y}-{m}-{d}')
        this.getCommodityList()
      })
    },
    getMarketStorageAccount() {
      getMarketStorageAccount({
        id: this.listQuery.id,
        gid: this.userdata.group.id,
        cid: this.listQuery.sid
      }).then(response => {
        this.listQuery.aid = response.data.data.aid
        this.account = response.data.data.account
        this.getMarketSubAccount()
      })
    },
    getGroupAllStorage() {
      getGroupAllStorage({
        id: this.userdata.user.id
      }).then(response => {
        if (response.data.data.list && response.data.data.list.length > 0) {
          response.data.data.list.forEach(v => {
            this.soptions.push({ value: v.id, label: v.name })
          })
          this.listQuery.sid = response.data.data.list[0].id
          this.getMarketStorageAccount()
        }
      })
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
