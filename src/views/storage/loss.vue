<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.sid" class="filter-item" @change="handleSelect">
        <el-option v-for="item in storages" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <el-select v-model="tid" class="filter-item" style="width:120px" @change="handleOrderSelect">
        <el-option v-for="item in orders" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <el-date-picker v-model="date" type="date" class="filter-item" style="width: 150px;" @change="handleSelect" />
      <el-select v-model="itype" class="filter-item" style="width:100px" @change="handleIOSelect">
        <el-option v-for="item in ioptions" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <span class="filter-item" style="color:#606266">{{ ioremark }}</span>
      <el-button type="primary" size="normal" style="float:right;width:100px" @click="handleApply()">提交</el-button>
    </div>

    <el-table ref="table" v-loading="loading" :data="list" :height="tableHeight" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="编号" fixed="left" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" fixed="left" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="品类" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.categoryName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="属性" width="260px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.attribute }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单价" width="110px" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.iprice" />
        </template>
      </el-table-column>
      <el-table-column label="重量(kg)" width="100px" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.iweight" />
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

    <el-dialog :title="tname" :visible.sync="dialogVisible">
      <el-form :model="temp" label-position="left" label-width="70px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="制单日期" prop="cname">
          <span>{{ temp.date }}</span>
        </el-form-item>
        <el-form-item label="仓库" prop="cremark">
          <el-select v-model="listQuery.sid" class="filter-item" @change="handleSelect">
            <el-option v-for="item in storages" :key="item.id" :label="item.label" :value="item.id" />
          </el-select>
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
import { parseTime, reviewType, completeType } from '@/utils'
import Pagination from '@/components/Pagination'
import { getGroupCategoryList } from '@/api/category'
import { getGroupAttrTemp } from '@/api/attribute'
import { getStorageCommodity } from '@/api/commodity'
import { addOrderRemark } from '@/api/order'
import { getStorageType, loss, getGroupAllStorage } from '@/api/storage'

export default {
  components: { Pagination },
  data() {
    return {
      tableHeight: 600,
      userdata: {},
      business: 2, // 业务类型
      itype: 1,
      ioptions: [{
        id: 1, label: '标准'
      }, {
        id: 2, label: '超码'
      }],
      ioremark: '',
      reviewList: reviewType,
      completeList: completeType,
      tid: 0,
      tname: '',
      orders: [],
      storages: [],
      date: new Date(),
      list: null,
      total: 0,
      loading: false,
      listQuery: {
        id: 0,
        sid: 0,
        page: 1,
        limit: 10,
        date: null,
        search: null
      },
      temp: {
        id: 0,
        batch: '',
        date: null,
        commoditys: [],
        prices: [],
        weights: [],
        norms: [],
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
    this.getStorageType()
    this.handleIOSelect()
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
      this.getCommodityList()
    },
    handleIOSelect() {
      if (this.itype === 1) {
        this.ioremark = '总价 = 单价 * 份数，总重量 = 克重 * 份数'
      } else {
        this.ioremark = '原料总价 = 单价 * 重量'
      }
    },
    getStorageType() {
      getStorageType({
        id: this.userdata.user.id,
        gid: this.userdata.group.id
      }).then(response => {
        const list = response.data.data.list
        if (list.length > 0) {
          list.forEach(v => {
            this.orders.push({ id: v.id, label: v.name })
          })
          this.tid = this.orders[0].id
          this.tname = '仓储' + this.orders[0].label + '单'
        }
        this.getCategoryList()
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
          this.handleSelect()
        }
      })
    },
    getCommodityList() {
      this.loading = true
      getStorageCommodity(this.listQuery).then(response => {
        const data = response.data.data
        this.total = data.total
        this.list = []
        if (data.list && data.list.length > 0) {
          data.list.forEach(v => {
            // 初始化数据
            v.iprice = ''
            v.iweight = ''
            v.inorm = ''
            v.ivalue = ''

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
        id: this.userdata.user.id
      }).then(response => {
        this.templateList = response.data.data.list
        this.getGroupAllStorage()
      })
    },
    handleAdd(row) {
      if (!row.iprice) {
        this.$message({ type: 'error', message: '请填写单价!' })
        return
      }
      if (!row.iweight) {
        this.$message({ type: 'error', message: '请填写重量!' })
        return
      }
      if (!row.inorm) {
        this.$message({ type: 'error', message: '请填写箱规!' })
        return
      }
      if (!row.ivalue) {
        this.$message({ type: 'error', message: '请填写份数!' })
        return
      }
      if (this.itype === 1) {
        // 总价 = 单价 * 份数，总重量 = 克重 * 份数
        row.price = (row.iprice * row.ivalue).toFixed(2)
        row.weight = (row.iweight * row.ivalue).toFixed(2)
      } else {
        // 原料总价 = 单价 * 重量
        row.price = (row.iprice * row.iweight).toFixed(2)
        row.weight = row.iweight
      }
      row.norm = row.inorm
      row.value = row.ivalue
      this.temp.list.push(Object.assign({}, row))
      this.$message({ type: 'success', message: '添加成功!' })
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
        sremark: ''
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
      loss({
        id: this.userdata.user.id,
        gid: this.userdata.group.id,
        sid: this.listQuery.sid,
        tid: this.tid,
        date: this.temp.date,
        review: this.temp.autoReview ? 1 : 0,
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
        this.$message({ type: 'success', message: '申请成功!' })
        this.getCommodityList()
        this.list = []
        this.dialogVisible = false
      })
    }
  }
}
</script>
