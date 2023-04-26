<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.review" class="filter-item" style="width:100px" @change="handleSelect">
        <el-option v-for="item in reviewList" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.complete" class="filter-item" style="width:100px" @change="handleSelect">
        <el-option v-for="item in completeList" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <el-date-picker v-model="date" type="date" class="filter-item" style="width: 150px;" @change="handleSelect" />
      <el-button type="primary" size="normal" style="float:right;width:100px" @click="handleApply()">提交</el-button>
    </div>

    <el-table v-loading="loading" :data="list" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="批次" align="center">
        <template slot-scope="{row}">
          <span>{{ row.batch }}</span>
        </template>
      </el-table-column>
      <el-table-column label="仓库" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品" align="center">
        <template slot-scope="{row}">
          <span>{{ row.commList }}</span>
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
      <el-table-column label="状态" align="center">
        <template slot-scope="{row}">
          <span>{{ row.complete == 0 ? '未完成' : '已完成' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请人" width="65px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.applyName }}</span>
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
      <span class="filter-item">----------  采购入库单信息  ----------</span>
    </div>
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
      <el-table-column label="重量(kg)" width="100px" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.weight" />
        </template>
      </el-table-column>
      <el-table-column label="份数" width="80px" align="center">
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
      <el-table-column label="重量(kg)" width="100px" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.weight" />
        </template>
      </el-table-column>
      <el-table-column label="份数" width="80px" align="center">
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
      <el-table-column label="重量(kg)" width="100px" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.weight" />
        </template>
      </el-table-column>
      <el-table-column label="份数" width="80px" align="center">
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

    <el-dialog title="采购入库单" :visible.sync="dialogVisible">
      <el-form :model="temp" label-position="left" label-width="70px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="采购单号" prop="ccode">
          <span>{{ temp.batch }}</span>
        </el-form-item>
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
          <el-table-column label="总价" width="110px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column label="重量" width="100px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.weight }}kg</span>
            </template>
          </el-table-column>
          <el-table-column label="份数" width="80px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.value }}</span>
            </template>
          </el-table-column>
        </el-table>

        <el-form-item />
        <el-form-item label="订单备注" prop="sremark">
          <el-input v-model="tempOrder.sremark" />
        </el-form-item>
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
import { parseTime, reviewType, completeType } from '@/utils'
import Pagination from '@/components/Pagination'
import { addOrderRemark, getPurchaseOrder } from '@/api/order'
import { purchase } from '@/api/storage'

export default {
  components: { Pagination },
  data() {
    return {
      userdata: {},
      business: 2, // 业务类型
      reviewList: reviewType,
      completeList: completeType,
      date: new Date(),
      list: null,
      total: 0,
      loading: false,
      listQuery: {
        id: 0,
        type: 1, // 采购进货
        page: 1,
        limit: 10,
        review: 2, // 已审核
        complete: 2, // 未完成
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
        list: []
      },
      tempOrder: {
        sremark: ''
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
      this.listQuery.limit = 10
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
              c.weight = c.weight / 1000
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
      this.temp.id = row.id
      this.temp.batch = row.batch
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
    handleApply() {
      this.temp.list = []
      this.temp.types = []
      this.temp.commoditys = []
      this.temp.prices = []
      this.temp.weights = []
      this.temp.norms = []
      this.temp.values = []
      if (this.temp.batch.length <= 0) {
        this.$message({ type: 'error', message: '请选择采购单!' })
        return
      }
      this.temp.date = parseTime(this.date, '{y}-{m}-{d}') + parseTime(new Date(), ' {h}:{i}:{s}')
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
        default:
          break
      }
      this.temp.types.push(type)
      this.temp.commoditys.push(row.cid)
      this.temp.prices.push(row.price)
      this.temp.weights.push(row.weight * 1000)
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
      purchase({
        id: this.userdata.user.id,
        gid: this.userdata.group.id,
        pid: this.temp.id,
        date: this.temp.date,
        types: this.temp.types,
        commoditys: this.temp.commoditys,
        prices: this.temp.prices,
        weights: this.temp.weights,
        values: this.temp.values,
        attrs: []
      }).then(response => {
        const id = response.data.data.id
        if (this.tempOrder.sremark.length > 0) {
          addOrderRemark({
            id: this.userdata.user.id,
            otype: this.business,
            oid: id,
            remark: this.tempOrder.sremark
          })
        }
        this.$message({ type: 'success', message: '申请成功!' })
        this.getCommodityList()
        this.dialogVisible = false
      })
    }
  }
}
</script>
