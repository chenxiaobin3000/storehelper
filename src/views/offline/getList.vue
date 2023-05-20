<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.type" class="filter-item" style="width:120px" @change="handleSelect">
        <el-option v-for="item in orders" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.review" class="filter-item" style="width:100px" @change="handleSelect">
        <el-option v-for="item in reviewList" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.complete" class="filter-item" style="width:100px" @change="handleSelect">
        <el-option v-for="item in completeList" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <el-date-picker v-model="date" type="date" class="filter-item" style="width: 150px;" @change="handleSelect" />
    </div>

    <el-table ref="table" v-loading="loading" :data="list" :height="tableHeight" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="批次" fixed="left" width="180px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.batch }} </span>
          <el-button icon="el-icon-tickets" size="mini" circle @click="handleDetail(row)" />
        </template>
      </el-table-column>
      <el-table-column label="供应商" fixed="left" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.maccount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="仓库" width="180px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sname }} </span>
          <el-button icon="el-icon-edit" size="mini" circle @click="handleFare(row)" />
        </template>
      </el-table-column>
      <el-table-column label="商品" width="260px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.commList }}</span>
        </template>
      </el-table-column>
      <el-table-column label="现价 / 总价" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.curPrice }} / {{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="存量 / 总数" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.curValue }} / {{ row.value }}</span>
        </template>
      </el-table-column>
      <el-table-column label="应收" align="center">
        <template slot-scope="{row}">
          <span>{{ row.curPrice - row.pay }} </span>
          <el-button icon="el-icon-edit" size="mini" circle @click="handlePay(row)" />
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
      <el-table-column label="操作" align="center" fixed="right" width="180" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button v-if="row.review>0" type="primary" size="mini" @click="handleRevoke(row)">撤销审核</el-button>
          <el-button v-else type="primary" size="mini" @click="handleReview(row)">审核</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getOrderList" />

    <el-dialog title="订单信息" :visible.sync="dialogVisible">
      <el-form :model="temp" label-position="left" label-width="70px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="批次" prop="batch">
          <span>{{ temp.batch }}</span>
        </el-form-item>
        <el-form-item label="仓库" prop="sname">
          <span>{{ temp.sname }}</span>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <span>{{ temp.maccount }}</span>
        </el-form-item>

        <!-- 商品列表 -->
        <el-form-item v-if="temp.comms && temp.comms.length > 0" label="商品列表" prop="remarks">
          <el-table :data="temp.comms" style="width: 100%" border stripe fit highlight-current-row>
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
            <el-table-column label="价格" width="80px" align="center">
              <template slot-scope="{row}">
                <el-input v-if="isEdit" v-model="row.price" />
                <span v-else>{{ row.price }}元</span>
              </template>
            </el-table-column>
            <el-table-column label="重量" width="80px" align="center">
              <template slot-scope="{row}">
                <el-input v-if="isEdit" v-model="row.weight" />
                <span v-else>{{ row.weight }}kg</span>
              </template>
            </el-table-column>
            <el-table-column label="箱规" width="80px" align="center">
              <template slot-scope="{row}">
                <el-input v-if="isEdit" v-model="row.norm" />
                <span v-else>{{ row.norm }}</span>
              </template>
            </el-table-column>
            <el-table-column label="份数" width="80px" align="center">
              <template slot-scope="{row}">
                <el-input v-if="isEdit" v-model="row.value" />
                <span v-else>{{ row.value }}件</span>
              </template>
            </el-table-column>
            <el-table-column v-if="isEdit" label="操作" width="90px" align="center">
              <template slot-scope="{row}">
                <el-button type="primary" @click="delCommodity(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item v-else label="商品列表" prop="remarks">
          <span>没有商品</span>
        </el-form-item>
        <el-form-item v-if="isEdit">
          <div align="center">
            <el-button type="danger" @click="changeEdit(false)">退出</el-button>
            <el-button type="primary" @click="updateCommodity()">确定</el-button>
          </div>
        </el-form-item>
        <el-form-item v-else>
          <div align="center">
            <el-button type="primary" @click="changeEdit(true)">修改</el-button>
          </div>
        </el-form-item>

        <!-- 运费列表 -->
        <el-form-item v-if="temp.fares && temp.fares.length > 0" label="运费列表" prop="fares">
          <el-table :data="temp.fares" style="width: 100%" border stripe fit highlight-current-row>
            <el-table-column label="物流" fixed="left" width="120px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.ship }} </span>
              </template>
            </el-table-column>
            <el-table-column label="车牌" width="100px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.code }} </span>
              </template>
            </el-table-column>
            <el-table-column label="电话" width="120px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.phone }} </span>
              </template>
            </el-table-column>
            <el-table-column label="费用" width="120px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.fare }} </span>
              </template>
            </el-table-column>
            <el-table-column label="备注" align="center">
              <template slot-scope="{row}">
                <span>{{ row.remark }} </span>
              </template>
            </el-table-column>
            <el-table-column label="时间" width="140px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.cdate }} </span>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item v-else label="运费列表" prop="fares">
          <span>没有运费</span>
        </el-form-item>

        <!-- 附件列表 -->
        <el-form-item v-if="temp.imageList && temp.imageList.length > 0">
          <span>附件列表</span><br>
          <el-image
            v-for="image in temp.imageList"
            :key="image"
            :src="image"
            :preview-src-list="temp.imageList"
            style="width: 100px; height: 100px"
          />
        </el-form-item>
        <el-form-item v-else label="附件列表" prop="attrs">
          <span>没有附件</span>
        </el-form-item>

        <!-- 备注列表 -->
        <el-form-item v-if="temp.remarks && temp.remarks.length > 0" label="备注列表" prop="remarks">
          <el-table :data="temp.remarks" style="width: 100%" border stripe fit highlight-current-row>
            <el-table-column label="时间" width="160px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.cdate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="备注" align="center">
              <template slot-scope="{row}">
                <span>{{ row.remark }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="90" class-name="small-padding fixed-width">
              <template slot-scope="{row}">
                <el-button type="primary" size="mini" @click="handleDeleteRemark(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item v-else label="备注列表" prop="remarks">
          <span>没有备注</span>
        </el-form-item>

        <!-- 追加备注 -->
        <el-form-item label="追加备注" prop="sremark">
          <el-input v-model="temp.remark" />
        </el-form-item>
        <div align="center">
          <el-button type="primary" @click="handleAddRemark()">追加</el-button>
        </div>
      </el-form>
    </el-dialog>

    <el-dialog title="修改收款信息" :visible.sync="dialogPayVisible">
      <el-form :model="tempOrder" label-position="left" label-width="70px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="已收款" prop="pay">
          <el-input v-model="tempOrder.pay" />
        </el-form-item>
        <div align="center">
          <el-button type="primary" @click="updatePay()">修改</el-button>
        </div>
      </el-form>
    </el-dialog>

    <el-dialog title="修改订单信息" :visible.sync="dialogFareVisible">
      <el-form :model="tempOrder" label-position="left" label-width="70px" style="width: 100%; padding: 0 4% 0 4%;">
        <!-- 运费列表 -->
        <el-form-item v-if="tempOrder.fares && tempOrder.fares.length > 0" label="运费列表" prop="fares">
          <el-table :data="tempOrder.fares" style="width: 100%" border stripe fit highlight-current-row>
            <el-table-column label="物流" align="center">
              <template slot-scope="{row}">
                <span>{{ row.ship }}</span>
              </template>
            </el-table-column>
            <el-table-column label="车牌" align="center">
              <template slot-scope="{row}">
                <span>{{ row.code }}</span>
              </template>
            </el-table-column>
            <el-table-column label="电话" align="center">
              <template slot-scope="{row}">
                <span>{{ row.phone }}</span>
              </template>
            </el-table-column>
            <el-table-column label="运费" align="center">
              <template slot-scope="{row}">
                <span>{{ row.fare }}元</span>
              </template>
            </el-table-column>
            <el-table-column label="备注" align="center">
              <template slot-scope="{row}">
                <span>{{ row.remark }}</span>
              </template>
            </el-table-column>
            <el-table-column label="时间" width="160px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.cdate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
              <template slot-scope="{row}">
                <el-button type="primary" size="mini" @click="copyFare(row)">复制</el-button>
                <el-button type="danger" size="mini" @click="deleteFare(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

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
        <el-form-item label="备注" prop="sremark">
          <el-input v-model="tempOrder.remark" />
        </el-form-item>
        <div align="center">
          <el-button type="primary" @click="updateFare()">追加</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { parseTime, reviewType, completeType } from '@/utils'
import Pagination from '@/components/Pagination'
import ImageSrc from '@/utils/image-src'
import { setOffline, reviewOffline, revokeOffline, setOfflinePay, delOffline, setReturn, reviewReturn, revokeReturn, delReturn } from '@/api/offline'
import { addOrderRemark, delOrderRemark, getOfflineOrder } from '@/api/order'
import { addOrderFare, delOrderFare } from '@/api/transport'

export default {
  components: { Pagination },
  data() {
    return {
      tableHeight: 600,
      userdata: {},
      business: 6, // 业务类型
      orders: [{
        id: 60, label: '线下销售单'
      }, {
        id: 61, label: '线下退货单'
      }],
      date: new Date(),
      list: null,
      total: 0,
      reviewList: reviewType,
      completeList: completeType,
      loading: false,
      listQuery: {
        id: 0,
        type: 60, // 线下销售
        page: 1,
        limit: 10,
        review: 1, // 全部
        complete: 0, // 未完成
        date: null,
        search: null
      },
      temp: {
        id: 0,
        batch: '',
        sname: '',
        maccount: '',
        comms: [],
        attrs: [],
        imageList: [],
        remark: ''
      },
      tempOrder: {
        pay: '',
        ship: '',
        code: '',
        phone: '',
        fare: 0,
        remark: ''
      },
      dialogVisible: false,
      dialogPayVisible: false,
      dialogFareVisible: false,
      isEdit: false
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
      this.getGroupList()
    },
    create() {
      this.$message({ type: 'error', message: '不支持新建!' })
    }
  },
  mounted: function() {
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 78
    }, 1000)
  },
  created() {
    this.userdata = this.$store.getters.userdata
    this.listQuery.id = this.userdata.user.id
    this.listQuery.date = parseTime(this.date, '{y}-{m}-{d}')
    this.getOrderList()
  },
  methods: {
    handleSelect() {
      this.listQuery.page = 1
      this.listQuery.limit = 10
      this.listQuery.date = parseTime(this.date, '{y}-{m}-{d}')
      this.getOrderList()
    },
    getOrderList() {
      this.loading = true
      getOfflineOrder(
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
        // 刷新弹出对话框
        if (this.temp.id > 0) {
          this.list.forEach(v => {
            if (this.temp.id === v.id) {
              this.temp.remarks = v.remarks
            }
          })
        }
        if (this.tempOrder.id > 0) {
          this.list.forEach(v => {
            if (this.tempOrder.id === v.id) {
              this.tempOrder.fares = v.fares
            }
          })
        }
        this.loading = false
      }).catch(error => {
        this.loading = false
        Promise.reject(error)
      })
    },
    handleDetail(row) {
      this.temp = Object.assign({}, row)
      this.temp.maccount = row.maccount
      this.temp.imageList = []
      if (this.temp.attrs && this.temp.attrs.length > 0) {
        this.temp.attrs.forEach(v => {
          this.temp.imageList.push(ImageSrc[v.src] + v.path + '/' + v.name)
        })
      }
      this.dialogVisible = true
    },
    changeEdit(edit) {
      this.isEdit = edit
    },
    delCommodity(row) {
      this.temp.comms.map((v, i) => {
        if (v.id === row.id) {
          this.temp.comms.splice(i, 1)
        }
      })
    },
    updateCommodity() {
      this.temp.commoditys = []
      this.temp.prices = []
      this.temp.weights = []
      this.temp.norms = []
      this.temp.values = []
      this.temp.comms.forEach(v => {
        this.temp.commoditys.push(v.cid)
        this.temp.prices.push(v.price)
        this.temp.weights.push(v.weight * 1000)
        this.temp.norms.push(v.norm)
        this.temp.values.push(v.value)
      })
      const data = {
        id: this.userdata.user.id,
        oid: this.temp.id,
        commoditys: this.temp.commoditys,
        prices: this.temp.prices,
        weights: this.temp.weights,
        norms: this.temp.norms,
        values: this.temp.values
      }
      switch (this.listQuery.type) {
        case 60:
          setOffline(data).then(() => {
            this.temp.remark = ''
            this.$message({ type: 'success', message: '更新成功!' })
            this.getOrderList()
          })
          break
        case 61:
          setReturn(data).then(() => {
            this.temp.remark = ''
            this.$message({ type: 'success', message: '更新成功!' })
            this.getOrderList()
          })
          break
        default:
          break
      }
    },
    handleAddRemark() {
      addOrderRemark({
        id: this.userdata.user.id,
        otype: this.business,
        oid: this.temp.id,
        remark: this.temp.remark
      }).then(() => {
        this.temp.remark = ''
        this.$message({ type: 'success', message: '更新成功!' })
        this.getOrderList()
      })
    },
    handleDeleteRemark(row) {
      delOrderRemark({
        id: this.userdata.user.id,
        otype: this.business,
        oid: this.temp.id,
        rid: row.id
      }).then(() => {
        this.$message({ type: 'success', message: '删除成功!' })
        this.getOrderList()
      })
    },
    handlePay(row) {
      this.tempOrder.id = row.id
      this.dialogPayVisible = true
    },
    updatePay() {
      if (this.tempOrder.pay.length <= 0) {
        this.$message({ type: 'error', message: '请填写已收款金额' })
        return
      }
      setOfflinePay({
        id: this.userdata.user.id,
        oid: this.tempOrder.id,
        pay: this.tempOrder.pay
      }).then(() => {
        this.$message({ type: 'success', message: '修改成功!' })
        this.getOrderList()
        this.dialogPayVisible = false
      })
    },
    handleFare(row) {
      this.tempOrder = {
        id: row.id,
        ship: '',
        code: '',
        phone: '',
        fare: '',
        remark: '',
        fares: row.fares
      }
      this.dialogFareVisible = true
    },
    copyFare(row) {
      this.tempOrder.ship = row.ship
      this.tempOrder.code = row.code
      this.tempOrder.phone = row.phone
      this.tempOrder.fare = row.fare
      this.tempOrder.remark = row.remark
    },
    deleteFare(row) {
      delOrderFare({
        id: this.userdata.user.id,
        otype: this.business,
        oid: this.tempOrder.id,
        fid: row.id
      }).then(() => {
        this.$message({ type: 'success', message: '删除成功!' })
        this.getOrderList()
      })
    },
    updateFare() {
      addOrderFare({
        id: this.userdata.user.id,
        otype: this.business,
        oid: this.tempOrder.id,
        ship: this.tempOrder.ship,
        code: this.tempOrder.code,
        phone: this.tempOrder.phone,
        fare: this.tempOrder.fare,
        remark: this.tempOrder.remark
      }).then(() => {
        this.$message({ type: 'success', message: '添加成功!' })
        this.getOrderList()
      })
    },
    handleReview(row) {
      this.$confirm('确定要审批吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          id: this.userdata.user.id,
          oid: row.id
        }
        switch (this.listQuery.type) {
          case 60:
            reviewOffline(data).then(() => {
              this.$message({ type: 'success', message: '审核成功!' })
              this.getOrderList()
            })
            break
          case 61:
            reviewReturn(data).then(() => {
              this.$message({ type: 'success', message: '审核成功!' })
              this.getOrderList()
            })
            break
          default:
            break
        }
      })
    },
    handleRevoke(row) {
      this.$confirm('确定要撤销吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          id: this.userdata.user.id,
          oid: row.id
        }
        switch (this.listQuery.type) {
          case 60:
            revokeOffline(data).then(() => {
              this.$message({ type: 'success', message: '撤销成功!' })
              this.getOrderList()
            })
            break
          case 61:
            revokeReturn(data).then(() => {
              this.$message({ type: 'success', message: '撤销成功!' })
              this.getOrderList()
            })
            break
          default:
            break
        }
      })
    },
    handleDelete(row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          id: this.userdata.user.id,
          oid: row.id
        }
        switch (this.listQuery.type) {
          case 22:
            delOffline(data).then(() => {
              this.$message({ type: 'success', message: '删除成功!' })
              this.getOrderList()
            })
            break
          case 23:
            delReturn(data).then(() => {
              this.$message({ type: 'success', message: '删除成功!' })
              this.getOrderList()
            })
            break
          default:
            break
        }
      })
    }
  }
}
</script>
