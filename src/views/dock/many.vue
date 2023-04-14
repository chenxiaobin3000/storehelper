<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="list" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="主账号" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.maccount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mremark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="平台" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="子账号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="子平台" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getMarketManyList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogVisible">
      <el-form :model="temp" label-position="left" label-width="70px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="主账号" prop="name">
          <el-select v-model="temp.aid" class="filter-item" @change="handleSelect">
            <el-option v-for="item in coptions" :key="item.id" :label="item.label" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="saccount">
          <span>{{ temp.mremark }}</span>
        </el-form-item>
        <el-form-item label="子账号" prop="account">
          <el-input v-model="temp.account" />
        </el-form-item>
        <el-form-item label="平台" prop="name">
          <el-select v-model="temp.mid" class="filter-item">
            <el-option v-for="item in moptions" :key="item.id" :label="item.label" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="account">
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
import { getMarketManyList, getMarketAllAccount, addMarketMany, setMarketMany, delMarketMany } from '@/api/dock'

export default {
  components: { Pagination },
  data() {
    return {
      userdata: {},
      moptions: [],
      coptions: [],
      list: null,
      total: 0,
      loading: false,
      listQuery: {
        id: 0,
        gid: 0,
        page: 1,
        limit: 20
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
  created() {
    this.userdata = this.$store.getters.userdata
    this.moptions = filterMarket(this.userdata.market, false)
    this.listQuery.id = this.userdata.user.id
    this.listQuery.gid = this.userdata.group.id
    this.resetTemp()
    this.getMarketAllAccount()
  },
  methods: {
    resetTemp() {
      this.temp = {
        id: 0,
        aid: '',
        mremark: '',
        mid: 1,
        account: '',
        remark: ''
      }
    },
    handleSelect() {
      // 备注
      this.coptions.forEach(v => {
        if (this.temp.aid === v.id) {
          this.temp.mremark = v.remark
        }
      })
    },
    getMarketAllAccount() {
      getMarketAllAccount({
        id: this.listQuery.id,
        gid: this.listQuery.gid
      }).then(response => {
        if (response.data.data.list && response.data.data.list.length > 0) {
          response.data.data.list.forEach(v => {
            this.coptions.push({ id: v.id, label: v.account, remark: v.remark })
          })
          this.getMarketManyList()
        }
      })
    },
    getMarketManyList() {
      this.loading = true
      getMarketManyList(
        this.listQuery
      ).then(response => {
        this.total = response.data.data.total
        this.list = response.data.data.list
        if (this.list && this.list.length > 0) {
          this.moptions.forEach(m => {
            this.list.forEach(v => {
              if (m.id === v.mmid) {
                v.mname = m.label
              }
              if (m.id === v.smid) {
                v.sname = m.label
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
      addMarketMany({
        id: this.listQuery.id,
        gid: this.listQuery.gid,
        mid: this.temp.mid,
        aid: this.temp.aid,
        account: this.temp.account,
        remark: this.temp.remark
      }).then(response => {
        this.$message({ type: 'success', message: '新增成功!' })
        this.getMarketManyList()
        this.dialogVisible = false
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      if (this.temp.mid == null) {
        this.temp.mid = 1
      }
      this.dialogStatus = 'update'
      this.dialogVisible = true
    },
    updateData() {
      setMarketMany({
        id: this.listQuery.id,
        gid: this.listQuery.gid,
        mid: this.temp.mid,
        aid: this.temp.aid,
        sub: this.temp.id,
        account: this.temp.account,
        remark: this.temp.remark
      }).then(response => {
        this.$message({ type: 'success', message: '修改成功!' })
        this.getMarketManyList()
        this.dialogVisible = false
      })
    },
    handleDelete(row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delMarketMany({
          id: this.listQuery.id,
          gid: this.listQuery.gid,
          aid: row.aid,
          sub: row.id
        }).then(response => {
          this.$message({ type: 'success', message: '删除成功!' })
          this.getMarketManyList()
        })
      })
    }
  }
}
</script>
