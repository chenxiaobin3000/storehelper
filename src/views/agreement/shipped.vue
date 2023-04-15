<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="ctype" class="filter-item" style="width:100px" @change="handleSelect">
        <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.sid" class="filter-item" @change="handleStorageSelect">
        <el-option v-for="item in storages" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <span class="filter-item" style="color:#606266"> 账号: {{ temp.account }} ({{ temp.remark }}), 子账号:</span>
      <el-select v-model="listQuery.asid" class="filter-item" style="width:160px" @change="handleSubSelect">
        <el-option v-for="item in asoptions" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <span class="filter-item" style="color:#606266">{{ temp.sremark }}</span>
      <el-date-picker v-model="date" type="date" class="filter-item" style="width: 150px;" />
      <el-button type="primary" size="normal" style="float:right;width:100px" @click="handleApply()">提交</el-button>
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
      <el-table-column label="备注" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.cremark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总价" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sprice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="重量" width="100px" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.iweight" />
        </template>
      </el-table-column>
      <el-table-column label="规格" width="80px" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.inorm" />
        </template>
      </el-table-column>
      <el-table-column label="件数" width="80px" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.ivalue" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="90" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleAdd(row)">添加</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getCommodityList" />

    <div class="filter-container" align="center">
      <span class="filter-item">----------  履约发货单信息  ----------</span>
    </div>
    <el-table v-if="temp.slist.length>0" v-loading="loading" :data="temp.slist" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="标品" width="100px" align="center">
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
      <el-table-column label="备注" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.cremark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="重量" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.weight }}</span>
        </template>
      </el-table-column>
      <el-table-column label="规格" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.norm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="件数" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.value }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="90" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="danger" size="mini" @click="handleDeleteStandard(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-table v-if="temp.clist.length>0" v-loading="loading" :data="temp.clist" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="商品" width="100px" align="center">
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
      <el-table-column label="备注" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.cremark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="重量" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.weight }}</span>
        </template>
      </el-table-column>
      <el-table-column label="规格" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.norm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="件数" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.value }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="90" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="danger" size="mini" @click="handleDeleteCommodity(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="履约发货单" :visible.sync="dialogVisible">
      <el-form :model="temp" label-position="left" label-width="70px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="制单日期" prop="date">
          <span>{{ temp.date }}</span>
        </el-form-item>
        <el-form-item label="仓库" prop="storage">
          <span>{{ temp.storage }}</span>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <span>{{ temp.saccount.length > 0 ? temp.saccount+'('+temp.sremark+')' : temp.account+'('+temp.remark+')' }}</span>
        </el-form-item>
        <el-table v-loading="loading" :data="temp.list" style="width: 100%" border fit highlight-current-row>
          <el-table-column label="类型" width="80px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column label="编号" width="100px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column label="名称" align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="重量" width="100px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.weight }}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格" width="80px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.norm }}</span>
            </template>
          </el-table-column>
          <el-table-column label="件数" width="80px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.value }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="applyData()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import { getGroupAllStorage } from '@/api/storage'
import { getGroupCategoryList } from '@/api/category'
import { getGroupAttrTemp } from '@/api/attribute'
import { getMarketCommodity, getMarketStandard } from '@/api/market'
import { getMarketStorageAccount, getMarketSubAccount } from '@/api/dock'
import { shipped } from '@/api/agreement'

export default {
  components: { Pagination },
  data() {
    return {
      userdata: {},
      ctype: 4,
      options: [{
        id: 4, label: '标品'
      }, {
        id: 1, label: '商品'
      }],
      storages: [],
      asoptions: [],
      date: new Date(),
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
        storage: '',
        account: '',
        remark: '',
        saccount: '',
        sremark: '',
        date: null,
        types: [],
        commoditys: [],
        weights: [],
        norms: [],
        values: [],
        attrs: null,
        clist: [],
        slist: [],
        list: []
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
          this.temp.saccount = v.label
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
          this.temp.saccount = this.asoptions[0].label
          this.temp.sremark = this.asoptions[0].remark
        } else {
          this.asoptions = [{ id: 0, label: '无' }]
          this.listQuery.asid = 0
          this.temp.saccount = ''
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
        this.temp.saccount = ''
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
            this.storages.push({ id: v.id, label: v.name })
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
          // 初始化数据
          v.iweight = v.sweight
          v.inorm = ''
          v.ivalue = v.svalue

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
    handleAdd(row) {
      row.weight = row.iweight
      row.norm = row.inorm
      row.value = row.ivalue
      switch (this.ctype) {
        case 1:
          this.temp.clist.map((v, i) => {
            if (v.id === row.id) {
              this.temp.clist.splice(i, 1)
            }
          })
          this.temp.clist.push(Object.assign({}, row))
          break
        case 4:
          this.temp.slist.map((v, i) => {
            if (v.id === row.id) {
              this.temp.slist.splice(i, 1)
            }
          })
          this.temp.slist.push(Object.assign({}, row))
          break
        default:
          break
      }
    },
    handleDeleteCommodity(row) {
      this.temp.clist.map((v, i) => {
        if (v.id === row.id) {
          this.temp.clist.splice(i, 1)
        }
      })
    },
    handleDeleteStandard(row) {
      this.temp.slist.map((v, i) => {
        if (v.id === row.id) {
          this.temp.slist.splice(i, 1)
        }
      })
    },
    handleApply() {
      this.temp.list = []
      this.temp.types = []
      this.temp.commoditys = []
      this.temp.weights = []
      this.temp.norms = []
      this.temp.values = []
      this.storages.forEach(v => {
        if (v.id === this.listQuery.sid) {
          this.temp.storage = v.label
        }
      })
      this.temp.date = parseTime(this.date, '{y}-{m}-{d}') + parseTime(new Date(), ' {h}:{i}:{s}')
      this.temp.slist.forEach(v => {
        this.addItem(4, v)
      })
      this.temp.clist.forEach(v => {
        this.addItem(1, v)
      })
      this.dialogVisible = true
    },
    addItem(type, row) {
      let typename = null
      this.options.forEach(v => {
        if (v.id === type) {
          typename = v.label
        }
      })
      this.temp.types.push(type)
      this.temp.commoditys.push(row.cid)
      this.temp.weights.push(row.weight)
      this.temp.norms.push(row.norm)
      this.temp.values.push(row.value)
      this.temp.list.push({
        type: typename,
        code: row.ccode,
        name: row.cname,
        weight: row.weight,
        norm: row.norm,
        value: row.value
      })
    },
    applyData() {
      shipped({
        id: this.userdata.user.id,
        gid: this.userdata.group.id,
        sid: this.listQuery.sid,
        aid: this.listQuery.aid,
        asid: this.listQuery.asid,
        date: this.temp.date,
        types: this.temp.types,
        commoditys: this.temp.commoditys,
        weights: this.temp.weights,
        norms: this.temp.norms,
        values: this.temp.values,
        attrs: []
      }).then(response => {
        this.$message({ type: 'success', message: '申请成功!' })
        this.getCommodityList()
        this.dialogVisible = false
      })
    }
  }
}
</script>
