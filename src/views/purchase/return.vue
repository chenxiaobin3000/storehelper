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

    <el-table ref="table" v-loading="loading" :data="list" :height="tableHeight" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="批次" fixed="left" width="140px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.batch }}</span>
        </template>
      </el-table-column>
      <el-table-column label="仓库" fixed="left" width="140px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品" width="260px" align="center">
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
      <el-table-column label="应付" align="center">
        <template slot-scope="{row}">
          <span>{{ row.curPrice - row.pay }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{row}">
          <span>{{ row.complete == 0 ? '未完成' : '已完成' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请人" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.applyName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请时间" width="155px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.applyTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核人" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.reviewName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核时间" width="155px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.reviewTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="90" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleSelectOrder(row)">选择</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getCommodityList" />

    <div class="filter-container" align="center">
      <span class="filter-item">----------  采购退货单信息  ----------</span>
    </div>
    <el-table v-if="temp.list.length>0" v-loading="loading" :data="temp.list" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="编号" width="120px" align="center">
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
      <el-table-column label="规格" width="100px" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.norm" />
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
          <el-table-column label="编号" width="120px" align="center">
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
          <el-table-column label="规格" width="100px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.norm }}</span>
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

        <!-- 物流 -->
        <el-form-item label="物流" prop="ship">
          <el-input v-model="tempOrder.ship" />
        </el-form-item>
        <el-form-item label="车牌" prop="code">
          <el-input v-model="tempOrder.code" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="tempOrder.phone" />
        </el-form-item>
        <el-form-item label="运费" prop="fare">
          <el-input v-model="tempOrder.fare" />
        </el-form-item>
        <el-form-item label="物流备注" prop="remark">
          <el-input v-model="tempOrder.remark" />
        </el-form-item>

        <el-form-item label="一键审核" prop="autoReview">
          <el-switch v-model="temp.autoReview" />
        </el-form-item>
        <el-form-item label="一键出库" prop="autoStorage">
          <el-switch v-model="temp.autoStorage" />
          <el-select v-model="temp.sid" class="filter-item" style="margin-left:10px" @change="handleSelect">
            <el-option v-for="item in storages" :key="item.id" :label="item.label" :value="item.id" />
          </el-select>
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
import { getGroupAllStorage } from '@/api/storage'
import { addOrderRemark, getPurchaseOrder } from '@/api/order'
import { addOrderFare } from '@/api/transport'
import { returnc } from '@/api/purchase'

export default {
  components: { Pagination },
  data() {
    return {
      tableHeight: 600,
      userdata: {},
      business: 1, // 业务类型
      reviewList: reviewType,
      completeList: completeType,
      storages: [],
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
        complete: 1, // 已完成
        date: null,
        search: null
      },
      temp: {
        id: 0,
        batch: '',
        sid: 0,
        storage: '',
        date: null,
        commoditys: [],
        prices: [],
        weights: [],
        norms: [],
        values: [],
        attrs: null,
        list: [],
        autoReview: false,
        autoStorage: false
      },
      tempOrder: {
        ship: '',
        code: '',
        phone: '',
        fare: 0,
        remark: '',
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
  mounted: function() {
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 178
    }, 1000)
  },
  created() {
    this.userdata = this.$store.getters.userdata
    this.listQuery.id = this.userdata.user.id
    this.listQuery.date = parseTime(this.date, '{y}{m}{d}')
    this.listQuery.date = this.listQuery.date.substr(2, this.listQuery.date.length - 2)
    this.getGroupAllStorage()
  },
  methods: {
    handleSelect() {
      this.listQuery.page = 1
      this.listQuery.limit = 10
      this.listQuery.date = parseTime(this.date, '{y}{m}{d}')
      this.listQuery.date = this.listQuery.date.substr(2, this.listQuery.date.length - 2)
      this.getCommodityList()
    },
    getGroupAllStorage() {
      getGroupAllStorage({
        id: this.userdata.user.id
      }).then(response => {
        if (response.data.data.list && response.data.data.list.length > 0) {
          response.data.data.list.forEach(v => {
            this.storages.push({ id: v.id, label: v.name })
          })
          this.temp.sid = response.data.data.list[0].id
          this.getCommodityList()
        }
      })
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
      this.temp.list = []
      this.temp.id = row.id
      this.temp.batch = row.batch
      this.temp.storage = row.sname
      row.comms.forEach(v => {
        this.temp.list.push(v)
      })
    },
    handleDeleteCommodity(row) {
      this.temp.list.map((v, i) => {
        if (v.id === row.id) {
          this.temp.list.splice(i, 1)
        }
      })
    },
    handleApply() {
      this.temp.commoditys = []
      this.temp.prices = []
      this.temp.weights = []
      this.temp.norms = []
      this.temp.values = []
      this.tempOrder = {
        ship: '',
        code: '',
        phone: '',
        fare: '',
        remark: '',
        sremark: ''
      }
      if (this.temp.batch.length <= 0) {
        this.$message({ type: 'error', message: '请选择采购单!' })
        return
      }
      this.temp.date = parseTime(this.date, '{y}-{m}-{d}') + parseTime(new Date(), ' {h}:{i}:{s}')
      this.temp.list.forEach(v => {
        this.temp.commoditys.push(v.cid)
        this.temp.prices.push(v.price)
        this.temp.weights.push(v.weight * 1000)
        this.temp.norms.push(v.norm)
        this.temp.values.push(v.value)
      })
      this.dialogVisible = true
    },
    applyData() {
      if (this.tempOrder.fare > 0) {
        if (this.tempOrder.ship.length <= 0) {
          this.$message({ type: 'error', message: '请填写物流名称!' })
          return
        }
        if (this.tempOrder.code.length <= 0) {
          this.$message({ type: 'error', message: '请填写物流车牌!' })
          return
        }
        if (this.tempOrder.phone.length <= 0) {
          this.$message({ type: 'error', message: '请填写物流电话!' })
          return
        }
      }
      returnc({
        id: this.userdata.user.id,
        rid: this.temp.id,
        sid: this.temp.sid,
        date: this.temp.date,
        review: this.temp.autoReview ? 1 : 0,
        storage: this.temp.autoStorage ? 1 : 0,
        commoditys: this.temp.commoditys,
        prices: this.temp.prices,
        weights: this.temp.weights,
        norms: this.temp.norms,
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
        if (this.tempOrder.fare > 0) {
          addOrderFare({
            id: this.userdata.user.id,
            otype: this.business,
            oid: id,
            ship: this.tempOrder.ship,
            code: this.tempOrder.code,
            phone: this.tempOrder.phone,
            fare: this.tempOrder.fare,
            remark: this.tempOrder.remark
          })
        }
        this.$message({ type: 'success', message: '申请成功!' })
        this.getCommodityList()
        this.temp.list = []
        this.dialogVisible = false
      })
    }
  }
}
</script>
