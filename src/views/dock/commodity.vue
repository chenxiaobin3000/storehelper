<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="ctype" class="filter-item" style="width:100px" @change="handleSelect">
        <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.sid" class="filter-item" @change="handleStorageSelect">
        <el-option v-for="item in soptions" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <span class="filter-item" style="color:#606266"> 账号: {{ temp.account }} ({{ temp.remark }}), 子账号:</span>
      <el-select v-model="listQuery.asid" class="filter-item" style="width:160px" @change="handleSubSelect">
        <el-option v-for="item in asoptions" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <span class="filter-item" style="color:#606266">{{ temp.sremark }}</span>
    </div>

    <el-table v-loading="loading" :data="list" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="编号" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ccode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.cname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="品类" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.categoryName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="属性" align="center">
        <template slot-scope="{row}">
          <span>{{ row.attribute }}</span>
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
      <el-table-column label="备注" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.cremark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="平台编号" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mcode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="平台名称" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="平台备注" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mremark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预警" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.alarm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getCommodityList" />

    <el-dialog title="修改平台对接商品信息" :visible.sync="dialogVisible">
      <el-form :model="temp" label-position="left" label-width="70px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="编号" prop="ccode">
          <span>{{ temp.ccode }}</span>
        </el-form-item>
        <el-form-item label="名称" prop="cname">
          <span>{{ temp.cname }}</span>
        </el-form-item>
        <el-form-item label="备注" prop="cremark">
          <span>{{ temp.cremark }}</span>
        </el-form-item>
        <el-form-item label="仓库" prop="sid">
          <el-select v-model="listQuery.sid" class="filter-item" @change="handleStorageSelect">
            <el-option v-for="item in soptions" :key="item.id" :label="item.label" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="账号" prop="aid">
          <span>{{ temp.account }}</span>
        </el-form-item>
        <el-form-item label="备注" prop="aid">
          <span>{{ temp.remark }}</span>
        </el-form-item>
        <el-form-item label="子账号" prop="asid">
          <el-select v-model="listQuery.asid" class="filter-item">
            <el-option v-for="item in asoptions" :key="item.id" :label="item.label" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="平台编号" prop="mcode">
          <el-input v-model="temp.mcode" />
        </el-form-item>
        <el-form-item label="平台名称" prop="mname">
          <el-input v-model="temp.mname" />
        </el-form-item>
        <el-form-item label="平台备注" prop="mremark">
          <el-input v-model="temp.mremark" />
        </el-form-item>
        <el-form-item label="预警价格" prop="alarm">
          <el-input v-model="temp.alarm" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updateData()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination'
import { setMarketCommodity, delMarketCommodity, getMarketCommodity, setMarketStandard, delMarketStandard, getMarketStandard } from '@/api/market'
import { getMarketStorageAccount, getMarketSubAccount } from '@/api/dock'
import { getGroupAllStorage } from '@/api/storage'
import { getGroupCategoryList } from '@/api/category'
import { getGroupAttrTemp } from '@/api/attribute'

export default {
  components: { Pagination },
  data() {
    return {
      userdata: {},
      soptions: [],
      asoptions: [],
      ctype: 4,
      options: [{
        id: 4, label: '标品'
      }, {
        id: 1, label: '商品'
      }],
      list: null,
      total: 0,
      categoryList: [],
      templateList: {},
      loading: false,
      listQuery: {
        id: 0,
        gid: 0,
        page: 1,
        limit: 20,
        sid: 0,
        aid: 0,
        asid: 0,
        search: null
      },
      temp: {
        cid: 0,
        ccode: '',
        cname: '',
        cremark: '',
        account: '',
        remark: '',
        sremark: '',
        mcode: '',
        mname: '',
        mremark: '',
        alarm: 0
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
    this.getCategoryList()
  },
  methods: {
    handleSelect() {
      this.listQuery.page = 1
      this.listQuery.limit = 20
      this.getCommodityList()
    },
    handleStorageSelect() {
      this.listQuery.page = 1
      this.listQuery.limit = 20
      this.getMarketStorageAccount()
    },
    handleSubSelect() {
      this.asoptions.forEach(v => {
        if (this.listQuery.asid === v.id) {
          this.temp.sremark = v.remark
        }
      })
      this.handleSelect()
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
            this.asoptions.push({ id: v.id, label: v.account, remark: v.remark })
          })
          this.listQuery.asid = this.asoptions[0].id
          this.temp.sremark = this.asoptions[0].remark
        } else {
          this.asoptions = [{ id: 0, label: '无' }]
          this.listQuery.asid = 0
          this.temp.sremark = ''
        }
        this.getCommodityList()
      })
    },
    getMarketStorageAccount() {
      getMarketStorageAccount({
        id: this.listQuery.id,
        gid: this.userdata.group.id,
        cid: this.listQuery.sid
      }).then(response => {
        const data = response.data.data
        this.listQuery.aid = data.aid
        this.temp.account = data.account
        this.temp.remark = data.remark
        this.getMarketSubAccount()
      }).catch(error => {
        this.temp.account = ''
        this.temp.remark = ''
        this.asoptions = [{ id: 0, label: '无' }]
        this.listQuery.asid = 0
        this.temp.sremark = ''
        this.getCommodityList()
        Promise.reject(error)
      })
    },
    getGroupAllStorage() {
      getGroupAllStorage({
        id: this.userdata.user.id
      }).then(response => {
        if (response.data.data.list && response.data.data.list.length > 0) {
          response.data.data.list.forEach(v => {
            this.soptions.push({ id: v.id, label: v.name })
          })
          this.listQuery.sid = response.data.data.list[0].id
          this.getMarketStorageAccount()
        }
      })
    },
    getCommodityList() {
      this.loading = true
      if (this.ctype === 1) {
        getMarketCommodity(
          this.listQuery
        ).then(response => {
          this.total = response.data.data.total
          this.handleRet(response.data.data.list)
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
          this.handleRet(response.data.data.list)
          this.loading = false
        }).catch(error => {
          this.loading = false
          Promise.reject(error)
        })
      }
    },
    handleRet(list) {
      this.list = []
      if (list && list.length > 0) {
        list.forEach(v => {
          // 品类
          this.categoryList.forEach(c => {
            if (c.id === v.category) {
              v.categoryName = c.name
            }
          })
          // 属性
          let idx = 0
          v.attribute = ''
          this.templateList.forEach(t => {
            v.attribute = v.attribute + t + ': ' + v.attrs[idx++] + ', '
          })
          this.list.push(v)
          // 子账号
          if (v.sub && v.sub.length > 0) {
            v.saccount = v.sub.join('\n')
          }
        })
      }
    },
    getCategoryList() {
      getGroupCategoryList({
        id: this.userdata.user.id
      }).then(response => {
        this.categoryList = response.data.data.list
        this.getGroupAttrTemp()
      })
    },
    getGroupAttrTemp() {
      getGroupAttrTemp({
        id: this.userdata.user.id,
        atid: this.ctype
      }).then(response => {
        this.templateList = response.data.data.list
        this.getGroupAllStorage()
      })
    },
    handleUpdate(row) {
      if (this.temp.mremark == null) {
        this.temp.mremark = ''
      }
      this.temp.cid = row.cid
      this.temp.ccode = row.ccode
      this.temp.cname = row.cname
      this.temp.cremark = row.cremark
      this.temp.mcode = row.mcode
      this.temp.mname = row.mname
      this.temp.mremark = row.mremark
      this.temp.alarm = row.alarm
      this.dialogVisible = true
    },
    updateData() {
      const data = {
        id: this.userdata.user.id,
        gid: this.userdata.group.id,
        sid: this.listQuery.sid,
        aid: this.listQuery.aid,
        asid: this.listQuery.asid,
        cid: this.temp.cid,
        code: this.temp.mcode,
        name: this.temp.mname,
        remark: this.temp.mremark == null ? '' : this.temp.mremark,
        price: this.temp.alarm
      }
      if (this.ctype === 1) {
        setMarketCommodity(data).then(response => {
          this.$message({ type: 'success', message: '修改成功!' })
          this.getCommodityList()
          this.dialogVisible = false
        })
      } else {
        setMarketStandard(data).then(response => {
          this.$message({ type: 'success', message: '修改成功!' })
          this.getCommodityList()
          this.dialogVisible = false
        })
      }
    },
    handleDelete(row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          id: this.userdata.user.id,
          gid: this.userdata.group.id,
          sid: row.sid,
          aid: row.aid,
          asid: row.asid,
          cid: row.cid
        }
        if (this.ctype === 1) {
          delMarketCommodity(data).then(response => {
            this.$message({ type: 'success', message: '删除成功!' })
            this.getCommodityList()
          })
        } else {
          delMarketStandard(data).then(response => {
            this.$message({ type: 'success', message: '删除成功!' })
            this.getCommodityList()
          })
        }
      })
    }
  }
}
</script>
