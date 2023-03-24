<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="list" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="云仓名称" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="平台名称" width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getMarketCloudList" />

    <el-dialog title="修改账号信息" :visible.sync="dialogVisible">
      <el-form :model="temp" label-position="left" label-width="70px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="云仓" prop="name">
          <span>{{ temp.name }}</span>
        </el-form-item>
        <el-form-item label="平台" prop="name">
          <el-select v-model="temp.mid" class="filter-item" @change="handleSelect">
            <el-option v-for="item in moptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input v-model="temp.account" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { filterMarket } from '@/utils/market-data'
import Pagination from '@/components/Pagination'
import { getMarketCloudList, setMarketCloud, delMarketCloud } from '@/api/dock'

export default {
  components: { Pagination },
  data() {
    return {
      userdata: {},
      moptions: [],
      list: null,
      total: 0,
      loading: false,
      listQuery: {
        id: 0,
        page: 1,
        limit: 20,
        search: null
      },
      temp: {},
      dialogVisible: false
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
    this.moptions = filterMarket(this.userdata.market, false)
    this.listQuery.id = this.userdata.user.id
    this.resetTemp()
    this.getMarketCloudList()
  },
  methods: {
    resetTemp() {
      this.temp = {
        id: 0,
        name: '',
        mid: 0,
        mname: '',
        account: ''
      }
    },
    handleSelect() {
      this.listQuery.page = 1
      this.listQuery.limit = 20
      this.getMarketCloudList()
    },
    getMarketCloudList() {
      this.loading = true
      getMarketCloudList(
        this.listQuery
      ).then(response => {
        this.total = response.data.data.total
        this.list = response.data.data.list
        if (this.list && this.list.length > 0) {
          this.moptions.forEach(m => {
            this.list.forEach(v => {
              if (m.value === v.mid) {
                v.mname = m.label
              }
            })
          })
        }
        this.loading = false
      }).catch(error => {
        this.loading = false
        Promise.reject(error)
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      if (this.temp.mid == null) {
        this.temp.mid = 1
      }
      this.dialogVisible = true
    },
    updateData() {
      setMarketCloud({
        id: this.listQuery.id,
        gid: this.userdata.group.id,
        mid: this.temp.mid,
        cid: this.temp.id,
        account: this.temp.account
      }).then(response => {
        this.$message({ type: 'success', message: '修改成功!' })
        this.getMarketCloudList()
        this.dialogVisible = false
      })
    },
    handleDelete(row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delMarketCloud({
          id: this.listQuery.id,
          gid: this.userdata.group.id,
          sid: row.id
        }).then(response => {
          this.$message({ type: 'success', message: '删除成功!' })
          this.getMarketCloudList()
        })
      })
    }
  }
}
</script>
