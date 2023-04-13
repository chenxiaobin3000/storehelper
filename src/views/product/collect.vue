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
      <el-select v-model="iotype" class="filter-item" style="width:100px" @change="handleIOSelect">
        <el-option v-for="item in ios" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
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
      <el-table-column label="总价" width="110px" align="center">
        <template slot-scope="{row}">
          <span v-if="iotype!==1">{{ row.sprice }}</span>
          <el-input v-else v-model="row.iprice" />
        </template>
      </el-table-column>
      <el-table-column label="重量" width="100px" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.iweight" />
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
      <span class="filter-item">----------  {{ title }}  ----------</span>
    </div>
    <el-table v-if="temp.data[iotype].slist.length>0" v-loading="loading" :data="temp.data[iotype].slist" style="width: 100%" border fit highlight-current-row>
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
      <el-table-column label="总价" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="重量" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.weight }}</span>
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

    <el-table v-if="temp.data[iotype].clist.length>0" v-loading="loading" :data="temp.data[iotype].clist" style="width: 100%" border fit highlight-current-row>
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
      <el-table-column label="总价" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="重量" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.weight }}</span>
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

    <el-table v-if="temp.data[iotype].hlist.length>0" v-loading="loading" :data="temp.data[iotype].hlist" style="width: 100%" border fit highlight-current-row>
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
      <el-table-column label="总价" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="重量" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.weight }}</span>
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

    <el-table v-if="temp.data[iotype].olist.length>0" v-loading="loading" :data="temp.data[iotype].olist" style="width: 100%" border fit highlight-current-row>
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
      <el-table-column label="总价" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="重量" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.weight }}</span>
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

    <el-dialog title="生产单信息" :visible.sync="dialogVisible">
      <el-form :model="temp" label-position="left" label-width="70px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="制单日期" prop="cname">
          <span>{{ temp.date }}</span>
        </el-form-item>
        <el-form-item label="仓库" prop="cremark">
          <span>{{ temp.storage }}</span>
        </el-form-item>
        <el-table v-loading="loading" :data="temp.list" style="width: 100%" border fit highlight-current-row>
          <el-table-column label="操作" width="80px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.io }}</span>
            </template>
          </el-table-column>
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
          <el-table-column label="总价" width="110px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column label="重量" width="100px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.weight }}</span>
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
import { collect } from '@/api/product'

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
      iotype: 0,
      ios: [{
        value: 0, label: '出库'
      }, {
        value: 1, label: '入库'
      }, {
        value: 2, label: '损耗'
      }],
      storages: [],
      date: new Date(),
      title: '出库信息',
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
        order: '',
        storage: '',
        date: null,
        types: [],
        commoditys: [],
        weights: [],
        values: [],
        types2: [],
        commoditys2: [],
        prices2: [],
        weights2: [],
        values2: [],
        types3: [],
        commoditys3: [],
        weights3: [],
        values3: [],
        attrs: null,
        data: [],
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
    this.temp.data.push({ clist: [], hlist: [], olist: [], slist: [] }) // 出库数据
    this.temp.data.push({ clist: [], hlist: [], olist: [], slist: [] }) // 入库数据
    this.temp.data.push({ clist: [], hlist: [], olist: [], slist: [] }) // 损耗数据
    this.getCategoryList()
  },
  methods: {
    handleSelect() {
      this.listQuery.page = 1
      this.listQuery.limit = 20
      this.getCommodityList()
    },
    handleIOSelect() {
      switch (this.iotype) {
        case 0:
          this.title = '出库信息'
          break
        case 1:
          this.title = '入库信息'
          break
        case 2:
          this.title = '损耗信息'
          break
        default:
          break
      }
      this.list.forEach(row => {
        row.iprice = row.sprice
        row.iweight = row.sweight
        row.ivalue = row.svalue
      })
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
          // 初始化数据
          v.iprice = v.sprice
          v.iweight = v.sweight
          v.ivalue = v.svalue

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
      if (this.iotype === 1) {
        row.price = row.iprice
      } else {
        row.price = (row.sprice / row.sweight * row.iweight).toFixed(2)
      }
      row.weight = row.iweight
      row.value = row.ivalue
      switch (this.ctype) {
        case 1:
          this.temp.data[this.iotype].clist.map((v, i) => {
            if (v.id === row.id) {
              this.temp.data[this.iotype].clist.splice(i, 1)
            }
          })
          this.temp.data[this.iotype].clist.push(Object.assign({}, row))
          break
        case 2:
          this.temp.data[this.iotype].hlist.map((v, i) => {
            if (v.id === row.id) {
              this.temp.data[this.iotype].hlist.splice(i, 1)
            }
          })
          this.temp.data[this.iotype].hlist.push(Object.assign({}, row))
          break
        case 3:
          this.temp.data[this.iotype].olist.map((v, i) => {
            if (v.id === row.id) {
              this.temp.data[this.iotype].olist.splice(i, 1)
            }
          })
          this.temp.data[this.iotype].olist.push(Object.assign({}, row))
          break
        case 4:
          this.temp.data[this.iotype].slist.map((v, i) => {
            if (v.id === row.id) {
              this.temp.data[this.iotype].slist.splice(i, 1)
            }
          })
          this.temp.data[this.iotype].slist.push(Object.assign({}, row))
          break
        default:
          break
      }
    },
    handleDeleteCommodity(row) {
      this.temp.data[this.iotype].clist.map((v, i) => {
        if (v.id === row.id) {
          this.temp.data[this.iotype].clist.splice(i, 1)
        }
      })
    },
    handleDeleteHalfgood(row) {
      this.temp.data[this.iotype].hlist.map((v, i) => {
        if (v.id === row.id) {
          this.temp.data[this.iotype].hlist.splice(i, 1)
        }
      })
    },
    handleDeleteOriginal(row) {
      this.temp.data[this.iotype].olist.map((v, i) => {
        if (v.id === row.id) {
          this.temp.data[this.iotype].olist.splice(i, 1)
        }
      })
    },
    handleDeleteStandard(row) {
      this.temp.data[this.iotype].slist.map((v, i) => {
        if (v.id === row.id) {
          this.temp.data[this.iotype].slist.splice(i, 1)
        }
      })
    },
    handleApply() {
      this.temp.list = []
      this.temp.types = []
      this.temp.commoditys = []
      this.temp.weights = []
      this.temp.values = []
      this.temp.types2 = []
      this.temp.commoditys2 = []
      this.temp.prices2 = []
      this.temp.weights2 = []
      this.temp.values2 = []
      this.temp.types3 = []
      this.temp.commoditys3 = []
      this.temp.weights3 = []
      this.temp.values3 = []
      this.storages.forEach(v => {
        if (v.value === this.listQuery.sid) {
          this.temp.storage = v.label
        }
      })
      this.temp.date = parseTime(this.date, '{y}-{m}-{d}') + parseTime(new Date(), ' {h}:{i}:{s}')
      for (let i = 0; i < 3; i++) {
        this.temp.data[i].slist.forEach(v => {
          this.addItem(i, 4, v)
        })
        this.temp.data[i].clist.forEach(v => {
          this.addItem(i, 1, v)
        })
        this.temp.data[i].hlist.forEach(v => {
          this.addItem(i, 2, v)
        })
        this.temp.data[i].olist.forEach(v => {
          this.addItem(i, 3, v)
        })
      }
      this.dialogVisible = true
    },
    addItem(io, type, row) {
      let typename = null
      this.options.forEach(v => {
        if (v.value === type) {
          typename = v.label
        }
      })
      let ioname = null
      switch (io) {
        case 0:
          ioname = '出库'
          this.temp.types.push(type)
          this.temp.commoditys.push(row.id)
          this.temp.weights.push(row.weight)
          this.temp.values.push(row.value)
          break
        case 1:
          ioname = '入库'
          this.temp.types2.push(type)
          this.temp.commoditys2.push(row.id)
          this.temp.prices2.push(row.price)
          this.temp.weights2.push(row.weight)
          this.temp.values2.push(row.value)
          break
        case 2:
          ioname = '损耗'
          this.temp.types3.push(type)
          this.temp.commoditys3.push(row.id)
          this.temp.weights3.push(row.weight)
          this.temp.values3.push(row.value)
          break
        default:
          break
      }
      this.temp.list.push({
        io: ioname,
        type: typename,
        code: row.code,
        name: row.name,
        price: row.price,
        weight: row.weight,
        value: row.value
      })
    },
    applyData() {
      collect({
        id: this.userdata.user.id,
        gid: this.userdata.group.id,
        sid: this.listQuery.sid,
        date: this.temp.date,
        types: this.temp.types,
        commoditys: this.temp.commoditys,
        weights: this.temp.weights,
        values: this.temp.values,
        types2: this.temp.types2,
        commoditys2: this.temp.commoditys2,
        prices2: this.temp.prices2,
        weights2: this.temp.weights2,
        values2: this.temp.values2,
        types3: this.temp.types3,
        commoditys3: this.temp.commoditys3,
        weights3: this.temp.weights3,
        values3: this.temp.values3,
        attrs: []
      }).then(response => {
        this.$message({ type: 'success', message: '修改成功!' })
        this.getCommodityList()
        this.dialogVisible = false
      })
    }
  }
}
</script>
