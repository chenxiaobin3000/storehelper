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
      <el-table-column label="账号" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.msaccount && row.msaccount.length > 0 ? row.msaccount : row.maccount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.msaccount && row.msaccount.length > 0 ? row.msremark : row.mremark }}</span>
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
      <span class="filter-item">----------  履约退货单信息  ----------</span>
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
          <span>{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="重量(kg)" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.weight }}</span>
        </template>
      </el-table-column>
      <el-table-column label="箱规" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.norm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="份数" width="80px" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.value" @change="handleValue(row)" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="90" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="danger" size="mini" @click="handleDeleteCommodity(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="履约退货单" :visible.sync="dialogVisible">
      <el-form :model="temp" label-position="left" label-width="70px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="履约单号" prop="batch">
          <span>{{ temp.batch }}</span>
        </el-form-item>
        <el-form-item label="制单日期" prop="date">
          <span>{{ temp.date }}</span>
        </el-form-item>
        <el-form-item label="仓库" prop="storage">
          <span>{{ temp.storage }}</span>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <span>{{ temp.account }}({{ temp.remark }})</span>
        </el-form-item>
        <el-table v-loading="loading" :data="temp.list" style="width: 100%" border fit highlight-current-row>s
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
          <el-table-column label="箱规" width="80px" align="center">
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
import { addOrderRemark, getAgreementOrder } from '@/api/order'
import { returnc } from '@/api/agreement'

export default {
  components: { Pagination },
  data() {
    return {
      userdata: {},
      business: 4, // 业务类型
      reviewList: reviewType,
      completeList: completeType,
      date: new Date(),
      list: null,
      total: 0,
      loading: false,
      listQuery: {
        id: 0,
        type: 20, // 履约发货
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
        storage: '',
        account: '',
        remark: '',
        date: null,
        commoditys: [],
        weights: [],
        values: [],
        attrs: null,
        clist: [],
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
      getAgreementOrder(
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
      this.temp.id = row.id
      this.temp.batch = row.batch
      this.temp.storage = row.sname
      this.temp.account = row.msaccount && row.msaccount.length > 0 ? row.msaccount : row.maccount
      this.temp.remark = row.msaccount && row.msaccount.length > 0 ? row.msremark : row.mremark
      row.comms.forEach(v => {
        v.oldPrice = v.price
        v.oldWeight = v.weight
        v.oldValue = v.value
        this.temp.clist.push(v)
      })
    },
    handleDeleteCommodity(row) {
      this.temp.clist.map((v, i) => {
        if (v.id === row.id) {
          this.temp.clist.splice(i, 1)
        }
      })
    },
    handleValue(row) {
      row.value = parseInt(row.value)
      if (row.value > row.oldValue) {
        row.value = row.oldValue
        this.$message({ type: 'error', message: '退货份数不能超过履约单份数!' })
        return
      }
      if (row.oldValue === row.value) {
        row.price = row.oldPrice
        row.weight = row.oldWeight
      } else {
        row.price = (row.oldPrice * row.value / row.oldValue).toFixed(2)
        row.weight = (row.oldWeight * row.value / row.oldValue).toFixed(2)
      }
    },
    handleApply() {
      this.temp.list = []
      this.temp.commoditys = []
      this.temp.prices = []
      this.temp.weights = []
      this.temp.norms = []
      this.temp.values = []
      if (this.temp.batch.length <= 0) {
        this.$message({ type: 'error', message: '请选择履约发货单!' })
        return
      }
      this.temp.date = parseTime(this.date, '{y}-{m}-{d}') + parseTime(new Date(), ' {h}:{i}:{s}')
      this.temp.clist.forEach(v => {
        this.temp.commoditys.push(v.cid)
        this.temp.prices.push(v.price)
        this.temp.weights.push(v.weight * 1000)
        this.temp.values.push(v.value)
        this.temp.list.push({
          code: v.code,
          name: v.name,
          price: v.price,
          weight: v.weight,
          norm: v.norm,
          value: v.value
        })
      })
      this.dialogVisible = true
    },
    applyData() {
      returnc({
        id: this.userdata.user.id,
        gid: this.userdata.group.id,
        rid: this.temp.id,
        date: this.temp.date,
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
