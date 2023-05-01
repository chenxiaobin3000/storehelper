<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.mid" class="filter-item" @change="handleSelect">
        <el-option v-for="item in moptions" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
    </div>

    <el-table ref="table" v-loading="loading" :data="list" :height="tableHeight" style="width: 100%" border fit highlight-current-row>
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
      <el-table-column label="备注" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="160" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" ref="pagination" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getMarketAccountList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogVisible">
      <el-form :model="temp" label-position="left" label-width="70px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="平台名称" prop="name">
          <span>{{ temp.mname }}</span>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input v-model="temp.account" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="temp.remark" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { filterMarket } from '@/utils/market-data'
import Pagination from '@/components/Pagination'
import { addMarketAccount, setMarketAccount, delMarketAccount, getMarketAccountList } from '@/api/market'

export default {
  components: { Pagination },
  data() {
    return {
      tableHeight: 600,
      userdata: {},
      moptions: [],
      list: null,
      total: 0,
      loading: false,
      listQuery: {
        id: 0,
        gid: 0,
        mid: 0,
        page: 1,
        limit: 10
      },
      temp: {},
      dialogVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改账号信息',
        create: '新增账号'
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
      this.resetTemp()
      this.moptions.forEach(m => {
        if (m.id === this.listQuery.mid) {
          this.temp.mname = m.label
        }
      })
      this.dialogStatus = 'create'
      this.dialogVisible = true
    }
  },
  mounted: function() {
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 78
    }, 1000)
  },
  created() {
    this.userdata = this.$store.getters.userdata
    this.moptions = filterMarket(this.userdata.market, false)
    this.listQuery.id = this.userdata.user.id
    this.listQuery.gid = this.userdata.group.id
    this.listQuery.mid = 1
    this.resetTemp()
    this.getMarketAccountList()
  },
  methods: {
    resetTemp() {
      this.temp = {
        id: 0,
        mid: 0,
        mname: '',
        account: '',
        remark: ''
      }
    },
    handleSelect() {
      this.listQuery.page = 1
      this.listQuery.limit = 10
      this.getMarketAccountList()
    },
    getMarketAccountList() {
      this.loading = true
      getMarketAccountList(
        this.listQuery
      ).then(response => {
        this.total = response.data.data.total
        this.list = response.data.data.list
        if (this.list && this.list.length > 0) {
          this.moptions.forEach(m => {
            this.list.forEach(v => {
              if (m.id === v.mid) {
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
    createData() {
      addMarketAccount({
        id: this.userdata.user.id,
        gid: this.userdata.group.id,
        mid: this.listQuery.mid,
        account: this.temp.account,
        remark: this.temp.remark
      }).then(response => {
        this.$message({ type: 'success', message: '新增成功!' })
        this.getMarketAccountList()
        this.dialogVisible = false
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogVisible = true
    },
    updateData() {
      setMarketAccount({
        id: this.userdata.user.id,
        gid: this.userdata.group.id,
        mid: this.temp.mid,
        aid: this.temp.id,
        account: this.temp.account,
        remark: this.temp.remark
      }).then(response => {
        this.$message({ type: 'success', message: '修改成功!' })
        this.getMarketAccountList()
        this.dialogVisible = false
      })
    },
    handleDelete(row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delMarketAccount({
          id: this.userdata.user.id,
          gid: this.userdata.group.id,
          mid: this.listQuery.mid,
          aid: row.id
        }).then(response => {
          this.$message({ type: 'success', message: '删除成功!' })
          this.getMarketAccountList()
        })
      })
    }
  }
}
</script>
