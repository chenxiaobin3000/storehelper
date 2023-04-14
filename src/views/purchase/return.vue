<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker v-model="date" type="date" class="filter-item" style="width: 150px;" @change="handleSelect" />
      <el-button type="primary" size="normal" style="float:right;width:100px" @click="handleApply()">提交</el-button>
    </div>

    <el-table v-loading="loading" :data="list" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="批次" align="center">
        <template slot-scope="{row}">
          <span>{{ row.batch }} </span>
        </template>
      </el-table-column>
      <el-table-column label="仓库" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总价" align="center">
        <template slot-scope="{row}">
          <span>{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="现价" align="center">
        <template slot-scope="{row}">
          <span>{{ row.curPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="应付" align="center">
        <template slot-scope="{row}">
          <span>{{ row.curPrice - row.pay }} </span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{row}">
          <span>{{ row.complete ==0 ? '未完成' : '已完成' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请人" width="65px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.applyName }} </span>
        </template>
      </el-table-column>
      <el-table-column label="申请时间" width="155px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.applyTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核人" width="65px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.reviewName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核时间" width="155px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.reviewTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="90" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleSelectOrder(row)">选择</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getCommodityList" />

    <div class="filter-container" align="center">
      <span class="filter-item">----------  采购退货单信息  ----------</span>
    </div>
    <el-table v-if="temp.slist.length>0" v-loading="loading" :data="temp.slist" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="标品" width="100px" align="center">
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
          <el-input v-model="row.price" />
        </template>
      </el-table-column>
      <el-table-column label="重量" width="100px" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.weight" />
        </template>
      </el-table-column>
      <el-table-column label="件数" width="80px" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.value" />
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
      <el-table-column label="名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总价" width="110px" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.price" />
        </template>
      </el-table-column>
      <el-table-column label="重量" width="100px" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.weight" />
        </template>
      </el-table-column>
      <el-table-column label="件数" width="80px" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.value" />
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
      <el-table-column label="名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总价" width="110px" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.price" />
        </template>
      </el-table-column>
      <el-table-column label="重量" width="100px" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.weight" />
        </template>
      </el-table-column>
      <el-table-column label="件数" width="80px" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.value" />
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
      <el-table-column label="名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总价" width="110px" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.price" />
        </template>
      </el-table-column>
      <el-table-column label="重量" width="100px" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.weight" />
        </template>
      </el-table-column>
      <el-table-column label="件数" width="80px" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.value" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="90" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="danger" size="mini" @click="handleDeleteOriginal(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="采购退货单" :visible.sync="dialogVisible">
      <el-form :model="temp" label-position="left" label-width="70px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="采购单号" prop="batch">
          <span>{{ temp.batch }}</span>
        </el-form-item>
        <el-form-item label="制单日期" prop="date">
          <span>{{ temp.date }}</span>
        </el-form-item>
        <el-form-item label="仓库" prop="storage">
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
import { parseTime, completeType } from '@/utils'
import Pagination from '@/components/Pagination'
import { getPurchaseOrder } from '@/api/order'
import { returnc } from '@/api/purchase'

export default {
  components: { Pagination },
  data() {
    return {
      userdata: {},
      date: new Date(),
      list: null,
      total: 0,
      completeList: completeType,
      loading: false,
      listQuery: {
        id: 0,
        type: 1, // 采购仓储进货
        page: 1,
        limit: 20,
        review: 1, // 全部
        complete: 0, // 未完成
        date: null,
        search: null
      },
      temp: {
        id: 0,
        batch: '',
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
    this.getCommodityList()
  },
  methods: {
    handleSelect() {
      this.listQuery.page = 1
      this.listQuery.limit = 20
      this.getCommodityList()
    },
    getCommodityList() {
      this.loading = true
      getPurchaseOrder(
        this.listQuery
      ).then(response => {
        this.total = response.data.data.total
        this.list = response.data.data.list
        this.list.forEach(v => {
          v.commList = ''
          if (v.comms && v.comms.length > 0) {
            v.comms.forEach(c => {
              if (v.commList.length < 20) {
                v.commList = v.commList + c.name + ','
              }
            })
          }
        })
        this.loading = false
      }).catch(error => {
        this.loading = false
        Promise.reject(error)
      })
    },
    handleSelectOrder(row) {
      this.temp.clist = []
      this.temp.hlist = []
      this.temp.olist = []
      this.temp.slist = []
      this.temp.id = row.id
      this.temp.storage = row.sname
      row.comms.forEach(v => {
        switch (v.ctype) {
          case 1:
            this.temp.clist.push(v)
            break
          case 2:
            this.temp.hlist.push(v)
            break
          case 3:
            this.temp.olist.push(v)
            break
          case 4:
            this.temp.slist.push(v)
            break
          default:
            break
        }
      })
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
      this.list.forEach(v => {
        if (v.id === this.temp.id) {
          this.temp.batch = v.batch
        }
      })
      if (this.temp.batch.length <= 0) {
        this.$message({ type: 'error', message: '请先选择采购单!' })
        return
      }
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
      switch (type) {
        case 1:
          typename = '商品'
          break
        case 2:
          typename = '半成品'
          break
        case 3:
          typename = '原料'
          break
        case 4:
          typename = '标品'
          break
        default:
          break
      }
      this.temp.types.push(type)
      this.temp.commoditys.push(row.cid)
      this.temp.prices.push(row.price)
      this.temp.weights.push(row.weight)
      this.temp.values.push(row.value)
      this.temp.list.push({
        type: typename,
        code: row.code,
        name: row.name,
        price: row.price,
        weight: row.weight,
        value: row.value
      })
    },
    applyData() {
      returnc({
        id: this.userdata.user.id,
        gid: this.userdata.group.id,
        rid: this.temp.id,
        date: this.temp.date,
        types: this.temp.types,
        commoditys: this.temp.commoditys,
        prices: this.temp.prices,
        weights: this.temp.weights,
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
