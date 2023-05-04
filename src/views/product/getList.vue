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
      <el-table-column label="批次" fixed="left" width="170px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.batch }} </span>
          <el-button icon="el-icon-tickets" size="mini" circle @click="handleDetail(row)" />
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
            <el-table-column label="价格" width="70px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.price }}元</span>
              </template>
            </el-table-column>
            <el-table-column label="重量" width="70px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.weight / 1000 }}kg</span>
              </template>
            </el-table-column>
            <el-table-column label="箱规" width="70px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.norm }}</span>
              </template>
            </el-table-column>
            <el-table-column label="份数" width="70px" align="center">
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
        <el-form-item label="追加备注" prop="remark">
          <el-input v-model="temp.remark" />
        </el-form-item>
        <div align="center">
          <el-button type="primary" @click="handleAddRemark()">追加</el-button>
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
import { getProductOrder } from '@/api/order'
import { reviewProcess, revokeProcess, delProcess, reviewComplete, revokeComplete, delComplete, reviewLoss, revokeLoss, delLoss } from '@/api/product'
import { addOrderRemark, delOrderRemark } from '@/api/order'

export default {
  components: { Pagination },
  data() {
    return {
      tableHeight: 600,
      userdata: {},
      business: 3, // 业务类型
      orders: [{
        id: 30, label: '出库单'
      }, {
        id: 31, label: '入库单'
      }, {
        id: 32, label: '损耗单'
      }],
      date: new Date(),
      list: null,
      total: 0,
      reviewList: reviewType,
      completeList: completeType,
      loading: false,
      listQuery: {
        id: 0,
        type: 30, // 生产出库
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
        comms: [],
        attrs: [],
        imageList: [],
        remark: ''
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
    this.listQuery.date = parseTime(this.date, '{y}{m}{d}')
    this.listQuery.date = this.listQuery.date.substr(2, this.listQuery.date.length - 2)
    this.getOrderList()
  },
  methods: {
    handleSelect() {
      this.listQuery.page = 1
      this.listQuery.limit = 10
      this.listQuery.date = parseTime(this.date, '{y}{m}{d}')
      this.listQuery.date = this.listQuery.date.substr(2, this.listQuery.date.length - 2)
      this.getOrderList()
    },
    getOrderList() {
      this.loading = true
      getProductOrder(
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
            reviewProcess(data).then(() => {
              this.$message({ type: 'success', message: '审核成功!' })
              this.getOrderList()
            })
            break
          case 31:
            reviewComplete(data).then(() => {
              this.$message({ type: 'success', message: '审核成功!' })
              this.getOrderList()
            })
            break
          case 32:
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
            revokeProcess(data).then(() => {
              this.$message({ type: 'success', message: '撤销成功!' })
              this.getOrderList()
            })
            break
          case 31:
            revokeComplete(data).then(() => {
              this.$message({ type: 'success', message: '撤销成功!' })
              this.getOrderList()
            })
            break
          case 32:
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
            delProcess(data).then(() => {
              this.$message({ type: 'success', message: '删除成功!' })
              this.getOrderList()
            })
            break
          case 31:
            delComplete(data).then(() => {
              this.$message({ type: 'success', message: '删除成功!' })
              this.getOrderList()
            })
            break
          case 32:
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
