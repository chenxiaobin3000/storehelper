<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="tid" class="filter-item" style="width:120px" @change="handleOrderSelect">
        <el-option v-for="item in orders" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.aid" class="filter-item" @change="handleSelect">
        <el-option v-for="item in aoptions" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <el-select v-model="mid" class="filter-item" style="width:120px" disabled>
        <el-option v-for="item in marketArr" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <el-date-picker v-model="date" type="date" class="filter-item" style="width: 150px;" @change="handleSelect" />
      <el-button type="primary" size="normal" style="float:right;width:100px" @click="handleApply()">提交</el-button>
    </div>

    <el-table ref="table" v-loading="loading" :data="list" :height="tableHeight" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="编号" fixed="left" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ccode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" fixed="left" align="center">
        <template slot-scope="{row}">
          <span>{{ row.cname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.cremark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="平台编号" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mcode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="平台名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="平台备注" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mremark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="成本价" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.wprice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="库存" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.svalue }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单价" width="100px" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.sprice" />
        </template>
      </el-table-column>
      <el-table-column label="份数" width="100px" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.value" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="90" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleAdd(row)">添加</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getCommodityList" />

    <div class="filter-container" align="center">
      <span class="filter-item">----------  {{ tname }}信息  ----------</span>
    </div>
    <el-table v-if="temp.list.length>0" v-loading="loading" :data="temp.list" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="编号" fixed="left" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ccode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" fixed="left" align="center">
        <template slot-scope="{row}">
          <span>{{ row.cname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.cremark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="平台编号" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mcode }} </span>
        </template>
      </el-table-column>
      <el-table-column label="平台名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="平台备注" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mremark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单价" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="份数" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.value }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="90" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="danger" size="mini" @click="handleDeleteCommodity(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="tname" :visible.sync="dialogVisible">
      <el-form :model="temp.list" label-position="left" label-width="70px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="制单日期" prop="date">
          <span>{{ temp.date }}</span>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-select v-model="listQuery.aid" class="filter-item" disabled>
            <el-option v-for="item in aoptions" :key="item.id" :label="item.label" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="罚款" prop="fine">
          <el-input v-model="temp.fine" />
        </el-form-item>
        <el-table v-loading="loading" :data="temp.list" style="width: 100%" border fit highlight-current-row>
          <el-table-column label="编号" fixed="left" width="120px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.ccode }}</span>
            </template>
          </el-table-column>
          <el-table-column label="名称" fixed="left" align="center">
            <template slot-scope="{row}">
              <span>{{ row.cname }}</span>
            </template>
          </el-table-column>
          <el-table-column label="平台编号" width="120px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.mcode }} </span>
            </template>
          </el-table-column>
          <el-table-column label="平台名称" align="center">
            <template slot-scope="{row}">
              <span>{{ row.mname }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单价" fixed="right" width="100px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column label="份数" fixed="right" width="100px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.value }}</span>
            </template>
          </el-table-column>
        </el-table>

        <el-form-item />
        <el-form-item label="订单备注" prop="sremark">
          <el-input v-model="tempOrder.sremark" />
        </el-form-item>

        <el-form-item label="一键审核" prop="autoReview">
          <el-switch v-model="temp.autoReview" />
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
import { parseTime } from '@/utils'
import { marketArr } from '@/utils/market-data'
import Pagination from '@/components/Pagination'
import { getMarketAllAccount, getMarketCommodityList } from '@/api/market'
import { getSaleType, loss } from '@/api/sale'

export default {
  components: { Pagination },
  data() {
    return {
      tableHeight: 600,
      userdata: {},
      business: 5, // 业务类型
      aoptions: [],
      mid: 0,
      marketArr: marketArr,
      tid: 0,
      tname: '',
      orders: [],
      date: new Date(),
      list: null,
      total: 0,
      loading: false,
      listQuery: {
        id: 0,
        gid: 0,
        page: 1,
        limit: 10,
        aid: 0,
        date: null,
        search: null
      },
      temp: {
        id: 0,
        account: '',
        remark: '',
        fine: 0,
        date: null,
        commoditys: [],
        prices: [],
        values: [],
        attrs: null,
        list: [],
        autoReview: false
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
  mounted: function() {
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 178
    }, 1000)
  },
  created() {
    this.userdata = this.$store.getters.userdata
    this.listQuery.id = this.userdata.user.id
    this.listQuery.gid = this.userdata.group.id
    this.listQuery.date = parseTime(this.date, '{y}-{m}-{d}')
    this.getSaleType()
    this.getMarketAllAccount()
  },
  methods: {
    handleOrderSelect() {
      this.orders.forEach(v => {
        if (v.id === this.tid) {
          this.tname = '平台' + v.label + '单'
        }
      })
    },
    handleSelect() {
      this.listQuery.page = 1
      this.listQuery.limit = 10
      this.listQuery.date = parseTime(this.date, '{y}-{m}-{d}')
      this.aoptions.forEach(v => {
        if (v.id === this.listQuery.aid) {
          this.mid = v.mid
        }
      })
      this.getCommodityList()
    },
    getSaleType() {
      getSaleType({
        id: this.userdata.user.id,
        gid: this.userdata.group.id
      }).then(response => {
        const list = response.data.data.list
        if (list.length > 0) {
          list.forEach(v => {
            this.orders.push({ id: v.id, label: v.name })
          })
          this.tid = this.orders[0].id
          this.tname = '平台' + this.orders[0].label + '单'
        }
        this.getCommodityList()
      })
    },
    getMarketAllAccount() {
      getMarketAllAccount({
        id: this.listQuery.id,
        gid: this.listQuery.gid
      }).then(response => {
        const list = response.data.data.list
        if (list.length > 0) {
          list.forEach(v => {
            const data = { id: v.id, label: v.account, mid: v.mid }
            this.aoptions.push(data)
          })
          this.listQuery.aid = this.aoptions[0].id
          this.mid = this.aoptions[0].mid
          this.getCommodityList()
        }
      })
    },
    getCommodityList() {
      this.loading = true
      getMarketCommodityList(
        this.listQuery
      ).then(response => {
        this.total = response.data.data.total
        this.list = response.data.data.list
        this.list.forEach(v => {
          v.sprice = v.svalue === 0 ? 0 : (v.sprice / v.svalue).toFixed(2)
          v.wprice = v.sprice
        })
        this.loading = false
      }).catch(error => {
        this.loading = false
        Promise.reject(error)
      })
    },
    handleAdd(row) {
      if (!row.sprice) {
        this.$message({ type: 'error', message: '请填写单价!' })
        return
      }
      if (!row.value) {
        this.$message({ type: 'error', message: '请填写份数!' })
        return
      }
      row.price = (row.sprice * row.value).toFixed(2)
      this.temp.list.map((v, i) => {
        if (v.cid === row.cid) {
          this.temp.list.splice(i, 1)
        }
      })
      this.temp.list.push(Object.assign({}, row))
    },
    handleDeleteCommodity(row) {
      this.temp.list.map((v, i) => {
        if (v.cid === row.cid) {
          this.temp.list.splice(i, 1)
        }
      })
    },
    handleApply() {
      this.tempOrder.sremark = ''
      this.temp.commoditys = []
      this.temp.prices = []
      this.temp.values = []
      this.temp.date = parseTime(this.date, '{y}-{m}-{d}') + parseTime(new Date(), ' {h}:{i}:{s}')
      this.temp.list.forEach(v => {
        this.temp.commoditys.push(v.cid)
        this.temp.prices.push(v.price)
        this.temp.values.push(v.value)
      })
      this.dialogVisible = true
    },
    applyData() {
      loss({
        id: this.userdata.user.id,
        gid: this.userdata.group.id,
        aid: this.listQuery.aid,
        tid: this.tid,
        fine: this.temp.fine,
        date: this.temp.date,
        review: this.temp.autoReview ? 1 : 0,
        commoditys: this.temp.commoditys,
        prices: this.temp.prices,
        values: this.temp.values,
        attrs: []
      }).then(response => {
        this.$message({ type: 'success', message: '申请成功!' })
        this.getCommodityList()
        this.temp.list = []
        this.dialogVisible = false
      })
    }
  }
}
</script>
