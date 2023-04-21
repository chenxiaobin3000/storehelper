<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.type" class="filter-item" style="width:120px" @change="handleSelect">
        <el-option v-for="item in orders" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.complete" class="filter-item" style="width:140px" @change="handleSelect">
        <el-option v-for="item in completeList" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <el-date-picker v-model="date" type="date" class="filter-item" style="width: 150px;" @change="handleSelect" />
    </div>

    <el-table v-loading="loading" :data="list" style="width: 100%" border fit highlight-current-row>
      <el-table-column v-if="listQuery.type===31" label="类型" align="center">
        <template slot-scope="{row}">
          <span>{{ row.type }} </span>
        </template>
      </el-table-column>
      <el-table-column label="批次" align="center">
        <template slot-scope="{row}">
          <span>{{ row.batch }} </span>
          <el-button icon="el-icon-tickets" size="mini" circle @click="handleDetail(row)" />
        </template>
      </el-table-column>
      <el-table-column label="仓库" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sname }} </span>
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
      <el-table-column v-if="listQuery.type===31" label="罚款" align="center">
        <template slot-scope="{row}">
          <span>{{ row.fine }} </span>
        </template>
      </el-table-column>
      <el-table-column label="应收" align="center">
        <template slot-scope="{row}">
          <span>{{ row.price - row.pay }} </span>
          <el-button icon="el-icon-edit" size="mini" circle @click="handlePay(row)" />
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
      <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
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
          <span>{{ temp.maccount }}({{ temp.mremark }})</span>
        </el-form-item>

        <!-- 商品列表 -->
        <el-form-item v-if="temp.comms && temp.comms.length > 0" label="商品列表" prop="remarks">
          <el-table :data="temp.comms" style="width: 100%" border stripe fit highlight-current-row>
            <el-table-column label="编号" width="80px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.code }}</span>
              </template>
            </el-table-column>
            <el-table-column label="名称" align="center">
              <template slot-scope="{row}">
                <span>{{ row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="价格" width="70px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.price }}元</span>
              </template>
            </el-table-column>
            <el-table-column label="件数" width="70px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.value }}件</span>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item v-else label="商品列表" prop="remarks">
          <span>没有商品</span>
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

    <el-dialog title="修改付款信息" :visible.sync="dialogPayVisible">
      <el-form :model="tempOrder" label-position="left" label-width="70px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="已收款" prop="pay">
          <el-input v-model="tempOrder.pay" />
        </el-form-item>
        <div align="center">
          <el-button type="primary" @click="updatePay()">修改</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { parseTime, completeType } from '@/utils'
import Pagination from '@/components/Pagination'
import ImageSrc from '@/utils/image-src'
import { reviewSale, revokeSale, delSale, setSalePay, reviewLoss, revokeLoss, delLoss } from '@/api/sale'
import { addOrderRemark, delOrderRemark, getSaleOrder } from '@/api/order'

export default {
  components: { Pagination },
  data() {
    return {
      userdata: {},
      business: 5, // 业务类型
      orders: [{
        id: 30, label: '平台销售单'
      }, {
        id: 31, label: '平台损耗单'
      }],
      date: new Date(),
      list: null,
      total: 0,
      supplierList: [],
      completeList: completeType,
      loading: false,
      listQuery: {
        id: 0,
        type: 30, // 平台销售
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
        sname: '',
        comms: [],
        attrs: [],
        imageList: [],
        remark: ''
      },
      tempOrder: {
        id: 0,
        pay: ''
      },
      dialogVisible: false,
      dialogPayVisible: false
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
  created() {
    this.userdata = this.$store.getters.userdata
    this.listQuery.id = this.userdata.user.id
    this.listQuery.date = parseTime(this.date, '{y}-{m}-{d}')
    this.getOrderList()
  },
  methods: {
    handleSelect() {
      this.listQuery.page = 1
      this.listQuery.limit = 20
      this.listQuery.date = parseTime(this.date, '{y}-{m}-{d}')
      this.getOrderList()
    },
    getOrderList() {
      this.loading = true
      getSaleOrder(
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
      this.temp.imageList = []
      if (this.temp.attrs && this.temp.attrs.length > 0) {
        this.temp.attrs.forEach(v => {
          this.temp.imageList.push(ImageSrc[v.src] + v.path + '/' + v.name)
        })
      }
      this.dialogVisible = true
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
      setSalePay({
        id: this.userdata.user.id,
        oid: this.tempOrder.id,
        pay: this.tempOrder.pay
      }).then(() => {
        this.$message({ type: 'success', message: '修改成功!' })
        this.getOrderList()
        this.dialogPayVisible = false
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
          case 30:
            reviewSale(data).then(() => {
              this.$message({ type: 'success', message: '审核成功!' })
              this.getOrderList()
            })
            break
          case 31:
            reviewLoss(data).then(() => {
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
          case 30:
            revokeSale(data).then(() => {
              this.$message({ type: 'success', message: '撤销成功!' })
              this.getOrderList()
            })
            break
          case 31:
            revokeLoss(data).then(() => {
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
          case 30:
            delSale(data).then(() => {
              this.$message({ type: 'success', message: '删除成功!' })
              this.getOrderList()
            })
            break
          case 31:
            delLoss(data).then(() => {
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
