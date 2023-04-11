<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="ctype" class="filter-item" style="width:100px" @change="handleSelect">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="listQuery.sid" class="filter-item" @change="handleSelect">
        <el-option v-for="item in storages" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-date-picker v-model="date" type="date" class="filter-item" style="width: 150px;" />
      <el-button type="primary" size="normal" style="float:right;width:100px" @click="handleApply()">提交</el-button>
    </div>

    <el-table v-loading="loading" :data="list" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="编号" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
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
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总价" width="80px" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.iprice" />
        </template>
      </el-table-column>
      <el-table-column label="重量" width="80px" align="center">
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

    <div class="filter-container">
      <span class="filter-item" style="width:100%;text-align:center">----------  采购进货单信息  ----------</span>
    </div>
    <el-table v-if="temp.slist.length>0" v-loading="loading" :data="temp.slist" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="标品" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
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
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总价" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="重量" width="80px" align="center">
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
          <span>{{ row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
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
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总价" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="重量" width="80px" align="center">
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

    <el-table v-if="temp.hlist.length>0" v-loading="loading" :data="temp.hlist" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="半成品" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
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
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总价" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="重量" width="80px" align="center">
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
          <el-button type="danger" size="mini" @click="handleDeleteHalfgood(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-table v-if="temp.olist.length>0" v-loading="loading" :data="temp.olist" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="原料" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
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
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总价" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="重量" width="80px" align="center">
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
          <el-button type="danger" size="mini" @click="handleDeleteOriginal(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="采购进货单" :visible.sync="dialogVisible">
      <el-form :model="temp" label-position="left" label-width="70px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="制单日期" prop="cname">
          <span>{{ temp.date }}</span>
        </el-form-item>
        <el-form-item label="仓库" prop="cremark">
          <span>{{ temp.storage }}</span>
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
          <el-table-column label="总价" width="80px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column label="重量" width="80px" align="center">
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
import { getStorageStandard } from '@/api/standard'
import { getStorageCommodity } from '@/api/commodity'
import { getStorageHalfgood } from '@/api/halfgood'
import { getStorageOriginal } from '@/api/original'
import { purchase } from '@/api/purchase'

export default {
  components: { Pagination },
  data() {
    return {
      userdata: {},
      ctype: 4,
      options: [{
        value: 4, label: '标品'
      }, {
        value: 1, label: '商品'
      }, {
        value: 2, label: '半成品'
      }, {
        value: 3, label: '原料'
      }],
      storages: [],
      date: new Date(),
      list: null,
      total: 0,
      categoryList: [],
      templateList: {},
      loading: false,
      listQuery: {
        id: 0,
        sid: 0,
        page: 1,
        limit: 20,
        search: null
      },
      temp: {
        storage: '',
        date: null,
        types: [],
        commoditys: [],
        prices: [],
        weights: [],
        norms: [],
        values: [],
        attrs: null,
        clist: [],
        hlist: [],
        olist: [],
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
    this.getCategoryList()
  },
  methods: {
    handleSelect() {
      this.listQuery.page = 1
      this.listQuery.limit = 20
      this.getCommodityList()
    },
    getGroupAllStorage() {
      getGroupAllStorage({
        id: this.userdata.user.id
      }).then(response => {
        if (response.data.data.list && response.data.data.list.length > 0) {
          response.data.data.list.forEach(v => {
            this.storages.push({ value: v.id, label: v.name })
          })
          this.listQuery.sid = response.data.data.list[0].id
          this.getCommodityList()
        }
      })
    },
    getCommodityList() {
      this.loading = true
      switch (this.ctype) {
        case 1:
          getStorageCommodity(
            this.listQuery
          ).then(response => {
            this.handleRet(response.data.data)
          }).catch(error => {
            this.loading = false
            Promise.reject(error)
          })
          break
        case 2:
          getStorageHalfgood(
            this.listQuery
          ).then(response => {
            this.handleRet(response.data.data)
          }).catch(error => {
            this.loading = false
            Promise.reject(error)
          })
          break
        case 3:
          getStorageOriginal(
            this.listQuery
          ).then(response => {
            this.handleRet(response.data.data)
          }).catch(error => {
            this.loading = false
            Promise.reject(error)
          })
          break
        case 4:
          getStorageStandard(
            this.listQuery
          ).then(response => {
            this.handleRet(response.data.data)
          }).catch(error => {
            this.loading = false
            Promise.reject(error)
          })
          break
        default:
          break
      }
    },
    handleRet(data) {
      this.total = data.total
      this.list = []
      if (data.list && data.list.length > 0) {
        data.list.forEach(v => {
          // 品类
          this.categoryList.forEach(c => {
            if (c.id === v.cid) {
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
      this.loading = false
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
      row.price = row.iprice
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
          this.temp.clist.push(row)
          break
        case 2:
          this.temp.hlist.map((v, i) => {
            if (v.id === row.id) {
              this.temp.hlist.splice(i, 1)
            }
          })
          this.temp.hlist.push(row)
          break
        case 3:
          this.temp.olist.map((v, i) => {
            if (v.id === row.id) {
              this.temp.olist.splice(i, 1)
            }
          })
          this.temp.olist.push(row)
          break
        case 4:
          this.temp.slist.map((v, i) => {
            if (v.id === row.id) {
              this.temp.slist.splice(i, 1)
            }
          })
          this.temp.slist.push(row)
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
    handleDeleteHalfgood(row) {
      this.temp.hlist.map((v, i) => {
        if (v.id === row.id) {
          this.temp.hlist.splice(i, 1)
        }
      })
    },
    handleDeleteOriginal(row) {
      this.temp.olist.map((v, i) => {
        if (v.id === row.id) {
          this.temp.olist.splice(i, 1)
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
      this.temp.prices = []
      this.temp.weights = []
      this.temp.norms = []
      this.temp.values = []
      this.storages.forEach(v => {
        if (v.value === this.listQuery.sid) {
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
      this.temp.hlist.forEach(v => {
        this.addItem(2, v)
      })
      this.temp.olist.forEach(v => {
        this.addItem(3, v)
      })
      this.dialogVisible = true
    },
    addItem(type, row) {
      let typename = null
      this.options.forEach(v => {
        if (v.value === type) {
          typename = v.label
        }
      })
      this.temp.types.push(type)
      this.temp.commoditys.push(row.id)
      this.temp.prices.push(row.price)
      this.temp.weights.push(row.weight)
      this.temp.norms.push(row.norm)
      this.temp.values.push(row.value)
      this.temp.list.push({
        type: typename,
        code: row.code,
        name: row.name,
        price: row.price,
        weight: row.weight,
        norm: row.norm,
        value: row.value
      })
    },
    applyData() {
      purchase({
        id: this.userdata.user.id,
        gid: this.userdata.group.id,
        sid: this.listQuery.sid,
        date: this.temp.date,
        types: this.temp.types,
        commoditys: this.temp.commoditys,
        prices: this.temp.prices,
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
