<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.sid" class="filter-item" @change="handleStorageSelect">
        <el-option v-for="item in storages" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <span class="filter-item" style="color:#606266"> 账号: {{ temp.account }}</span>
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
      <el-table-column label="总价" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.iprice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="重量(kg)" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.iweight }}</span>
        </template>
      </el-table-column>
      <el-table-column label="箱规" width="80px" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.inorm" />
        </template>
      </el-table-column>
      <el-table-column label="份数" width="80px" align="center">
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
          <span>{{ temp.account }}</span>
        </el-form-item>
        <el-table v-loading="loading" :data="temp.list" style="width: 100%" border fit highlight-current-row>
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
import { getTodayStockList } from '@/api/stock'
import { addOrderRemark } from '@/api/order'
import { addOrderFare } from '@/api/transport'
import { shipped } from '@/api/agreement'

export default {
  components: { Pagination },
  data() {
    return {
      userdata: {},
      business: 4, // 业务类型
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
        page: 1,
        limit: 10,
        sid: 0,
        ctype: 1,
        search: null
      },
      temp: {
        storage: '',
        account: '',
        date: null,
        commoditys: [],
        prices: [],
        weights: [],
        norms: [],
        values: [],
        attrs: null,
        clist: [],
        list: []
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
  created() {
    this.userdata = this.$store.getters.userdata
    this.listQuery.id = this.userdata.user.id
    this.listQuery.gid = this.userdata.group.id
    this.getCategoryList()
  },
  methods: {
    handleSelect() {
      this.listQuery.page = 1
      this.listQuery.limit = 10
      this.getCommodityList()
    },
    handleStorageSelect() {
      this.listQuery.page = 1
      this.listQuery.limit = 10
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
        }
      })
    },
    getCommodityList() {
      this.loading = true
      getTodayStockList(
        this.listQuery
      ).then(response => {
        this.list = []
        this.total = response.data.data.total
        const list = response.data.data.list
        if (list && list.length > 0) {
          list.forEach(v => {
            // 初始化数据
            v.iprice = v.price
            v.weight = v.weight / 1000
            v.iweight = v.weight
            v.inorm = ''
            v.ivalue = v.value

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
              v.attribute = v.attribute + t + ': ' + (v.attrs[idx] ? v.attrs[idx++] : '') + ', '
            })
            this.list.push(v)
          })
        }
        this.loading = false
      }).catch(error => {
        this.loading = false
        Promise.reject(error)
      })
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
        atid: 1
      }).then(response => {
        this.templateList = response.data.data.list
        this.getGroupAllStorage()
      })
    },
    handleAdd(row) {
      if (!row.inorm) {
        this.$message({ type: 'error', message: '请填写箱规!' })
        return
      }
      if (!row.ivalue) {
        this.$message({ type: 'error', message: '请填写份数!' })
        return
      }
      // 按份数
      if (row.value === row.ivalue) {
        row.price = row.iprice
        row.weight = row.iweight
      } else {
        row.price = (row.iprice * row.ivalue / row.value).toFixed(2)
        row.weight = (row.iweight * row.ivalue / row.value).toFixed(2)
      }
      row.norm = row.inorm
      row.value = row.ivalue
      this.temp.clist.map((v, i) => {
        if (v.id === row.id) {
          this.temp.clist.splice(i, 1)
        }
      })
      this.temp.clist.push(Object.assign({}, row))
    },
    handleDeleteCommodity(row) {
      this.temp.clist.map((v, i) => {
        if (v.id === row.id) {
          this.temp.clist.splice(i, 1)
        }
      })
    },
    handleApply() {
      this.temp.list = []
      this.temp.commoditys = []
      this.temp.prices = []
      this.temp.weights = []
      this.temp.norms = []
      this.temp.values = []
      this.storages.forEach(v => {
        if (v.id === this.listQuery.sid) {
          this.temp.storage = v.label
        }
      })
      this.temp.date = parseTime(this.date, '{y}-{m}-{d}') + parseTime(new Date(), ' {h}:{i}:{s}')
      this.temp.clist.forEach(v => {
        this.temp.commoditys.push(v.id)
        this.temp.prices.push(v.price)
        this.temp.weights.push(v.weight * 1000)
        this.temp.norms.push(v.norm)
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
      shipped({
        id: this.userdata.user.id,
        gid: this.userdata.group.id,
        sid: this.listQuery.sid,
        aid: this.listQuery.aid,
        asid: this.listQuery.asid,
        date: this.temp.date,
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
        this.dialogVisible = false
      })
    }
  }
}
</script>
