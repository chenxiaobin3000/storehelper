<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="list" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="仓库" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="主账号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="平台" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ marketArr[row.mid] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="子账号" align="center">
        <template slot-scope="{row}">
          <span style="white-space:pre-wrap">{{ row.saccount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="120px" align="center">
        <template slot-scope="{row}">
          <span style="white-space:pre-wrap">{{ row.sremark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="子平台" width="80px" align="center">
        <template slot-scope="{row}">
          <span style="white-space:pre-wrap">{{ row.sname }}</span>
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

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getMarketStorageList" />

    <el-dialog title="修改账号信息" :visible.sync="dialogVisible">
      <el-form :model="temp" label-position="left" label-width="70px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="仓库" prop="name">
          <span>{{ temp.name }}</span>
        </el-form-item>
        <el-form-item label="主账号" prop="aid">
          <el-select v-model="temp.aid" class="filter-item" @change="handleSelect">
            <el-option v-for="item in aoptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="saccount">
          <span>{{ temp.remark }}</span>
        </el-form-item>
        <el-form-item label="子账号" prop="saccount">
          <span>{{ temp.saccount }}</span>
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
import { marketArr } from '@/utils/market-data'
import Pagination from '@/components/Pagination'
import { getMarketAllAccount, getMarketSubAccount, getMarketStorageList, setMarketStorage, delMarketStorage } from '@/api/dock'

export default {
  components: { Pagination },
  data() {
    return {
      userdata: {},
      aoptions: [],
      marketArr: null,
      list: null,
      total: 0,
      loading: false,
      listQuery: {
        id: 0,
        page: 1,
        limit: 20,
        search: null
      },
      temp: {
        id: 0,
        name: '',
        aid: 0,
        remark: '',
        saccount: ''
      },
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
    this.marketArr = marketArr
    this.listQuery.id = this.userdata.user.id
    this.getMarketAllAccount()
  },
  methods: {
    handleSelect() {
      // 备注
      this.aoptions.forEach(v => {
        if (this.temp.aid === v.value) {
          this.temp.remark = v.remark
        }
      })

      // 子账号选择
      this.temp.saccount = ''
      getMarketSubAccount({
        id: this.listQuery.id,
        gid: this.userdata.group.id,
        aid: this.temp.aid
      }).then(response => {
        if (response.data.data.list && response.data.data.list.length > 0) {
          response.data.data.list.forEach(v => {
            this.temp.saccount = this.temp.saccount + v.account + '\n'
          })
          this.$forceUpdate()
        }
      })
    },
    getMarketAllAccount() {
      getMarketAllAccount({
        id: this.listQuery.id,
        gid: this.userdata.group.id
      }).then(response => {
        if (response.data.data.list && response.data.data.list.length > 0) {
          response.data.data.list.forEach(v => {
            this.aoptions.push({ value: v.id, label: v.account, remark: v.remark })
          })
          this.getMarketStorageList()
        }
      })
    },
    getMarketStorageList() {
      this.loading = true
      getMarketStorageList(
        this.listQuery
      ).then(response => {
        this.total = response.data.data.total
        this.list = response.data.data.list
        if (this.list && this.list.length > 0) {
          this.list.forEach(v => {
            if (v.sub && v.sub.length > 0) {
              v.saccount = ''
              v.sname = ''
              v.sremark = ''
              v.sub.forEach(s => {
                v.saccount = v.saccount + s.account + '\n'
                v.sname = v.sname + marketArr[s.mid] + '\n'
                v.sremark = v.sremark + s.remark + '\n'
              })
            }
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
      this.dialogVisible = true
    },
    updateData() {
      setMarketStorage({
        id: this.listQuery.id,
        gid: this.userdata.group.id,
        aid: this.temp.aid,
        sid: this.temp.sid,
        cid: this.temp.id
      }).then(response => {
        this.$message({ type: 'success', message: '修改成功!' })
        this.getMarketStorageList()
        this.dialogVisible = false
      })
    },
    handleDelete(row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delMarketStorage({
          id: this.listQuery.id,
          gid: this.userdata.group.id,
          cid: row.id
        }).then(response => {
          this.$message({ type: 'success', message: '删除成功!' })
          this.getMarketStorageList()
        })
      })
    }
  }
}
</script>
