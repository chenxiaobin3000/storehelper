<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="itype" class="filter-item" style="width:100px" @change="handleIOSelect">
        <el-option v-for="item in ioptions" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <el-select v-model="otype" class="filter-item" style="width:120px" @change="handleSelect">
        <el-option v-for="item in orders" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.review" class="filter-item" style="width:100px" @change="handleSelect">
        <el-option v-for="item in reviewList" :key="item.id" :label="item.label" :value="item.id" />
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
      <el-table-column label="总重量" align="center">
        <template slot-scope="{row}">
          <span>{{ row.unit / 1000 }}kg</span>
        </template>
      </el-table-column>
      <el-table-column label="总份数" align="center">
        <template slot-scope="{row}">
          <span>{{ row.value }}</span>
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
            <el-table-column label="时间" width="160px" align="center">
              <template slot-scope="{row}">
                <span>{{ row.cdate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="运费" align="center">
              <template slot-scope="{row}">
                <span>{{ row.fare }}元</span>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item v-else label="运费列表" prop="fares">
          <span>没有运费</span>
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
          </el-table>
        </el-form-item>
        <el-form-item v-else label="备注列表" prop="remarks">
          <span>没有备注</span>
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
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { parseTime, reviewType } from '@/utils'
import Pagination from '@/components/Pagination'
import ImageSrc from '@/utils/image-src'
import { getStorageOrder } from '@/api/order'
import {
  setIn, reviewIn, revokeIn, delIn, setOut, reviewOut, revokeOut, delOut,
  setDispatchIn, reviewDispatchIn, revokeDispatchIn, delDispatchIn,
  setDispatchOut, reviewDispatchOut, revokeDispatchOut, delDispatchOut,
  setLoss, reviewLoss, revokeLoss, delLoss
} from '@/api/storage'

export default {
  components: { Pagination },
  data() {
    return {
      tableHeight: 600,
      userdata: {},
      otype: 10,
      orders: [{
        id: 10, label: '采购单'
      }, {
        id: 12, label: '生产单'
      }, {
        id: 14, label: '履约单'
      }, {
        id: 16, label: '销售单'
      }, {
        id: 18, label: '仓储单'
      }],
      itype: 1,
      ioptions: [{
        id: 1, label: '入库'
      }, {
        id: 2, label: '出库'
      }],
      date: new Date(),
      list: null,
      total: 0,
      reviewList: reviewType,
      loading: false,
      listQuery: {
        id: 0,
        type: 10, // 采购入库
        page: 1,
        limit: 10,
        review: 1, // 全部
        date: null,
        search: null
      },
      temp: {
        batch: '',
        sname: '',
        comms: [],
        attrs: [],
        imageList: []
      },
      dialogVisible: false,
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
    handleIOSelect() {
      if (this.itype === 1) {
        this.orders = [{
          id: 10, label: '采购单'
        }, {
          id: 12, label: '生产单'
        }, {
          id: 14, label: '履约单'
        }, {
          id: 16, label: '销售单'
        }, {
          id: 18, label: '仓储单'
        }]
        this.otype = 10
      } else {
        this.orders = [{
          id: 11, label: '采购单'
        }, {
          id: 13, label: '生产单'
        }, {
          id: 15, label: '履约单'
        }, {
          id: 17, label: '销售单'
        }, {
          id: 19, label: '仓储单'
        }, {
          id: 20, label: '损耗单'
        }]
        this.otype = 11
      }
      this.handleSelect()
    },
    handleSelect() {
      this.listQuery.type = this.otype
      this.listQuery.page = 1
      this.listQuery.limit = 10
      this.listQuery.date = parseTime(this.date, '{y}-{m}-{d}')
      this.getOrderList()
    },
    getOrderList() {
      this.loading = true
      getStorageOrder(
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
        type: this.otype,
        oid: this.temp.id,
        commoditys: this.temp.commoditys,
        prices: this.temp.prices,
        weights: this.temp.weights,
        norms: this.temp.norms,
        values: this.temp.values
      }
      switch (this.listQuery.type) {
        case 10:
        case 12:
        case 14:
        case 16:
          setIn(data).then(() => {
            this.temp.remark = ''
            this.$message({ type: 'success', message: '更新成功!' })
            this.getOrderList()
          })
          break
        case 18:
          setDispatchIn(data).then(() => {
            this.temp.remark = ''
            this.$message({ type: 'success', message: '更新成功!' })
            this.getOrderList()
          })
          break
        case 11:
        case 13:
        case 15:
        case 17:
          setOut(data).then(() => {
            this.temp.remark = ''
            this.$message({ type: 'success', message: '更新成功!' })
            this.getOrderList()
          })
          break
        case 19:
          setDispatchOut(data).then(() => {
            this.temp.remark = ''
            this.$message({ type: 'success', message: '更新成功!' })
            this.getOrderList()
          })
          break
        case 20:
          setLoss(data).then(() => {
            this.temp.remark = ''
            this.$message({ type: 'success', message: '更新成功!' })
            this.getOrderList()
          })
          break
        default:
          break
      }
    },
    handleReview(row) {
      this.$confirm('确定要通过吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          id: this.userdata.user.id,
          type: this.otype,
          oid: row.id
        }
        switch (this.otype) {
          case 10:
          case 12:
          case 14:
          case 16:
            reviewIn(data).then(() => {
              this.$message({ type: 'success', message: '审核成功!' })
              this.getOrderList()
            })
            break
          case 11:
          case 13:
          case 15:
          case 17:
            reviewOut(data).then(() => {
              this.$message({ type: 'success', message: '审核成功!' })
              this.getOrderList()
            })
            break
          case 18:
            reviewDispatchIn(data).then(() => {
              this.$message({ type: 'success', message: '审核成功!' })
              this.getOrderList()
            })
            break
          case 19:
            reviewDispatchOut(data).then(() => {
              this.$message({ type: 'success', message: '审核成功!' })
              this.getOrderList()
            })
            break
          case 20:
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
          type: this.otype,
          oid: row.id
        }
        switch (this.otype) {
          case 10:
          case 12:
          case 14:
          case 16:
            revokeIn(data).then(() => {
              this.$message({ type: 'success', message: '撤销成功!' })
              this.getOrderList()
            })
            break
          case 11:
          case 13:
          case 15:
          case 17:
            revokeOut(data).then(() => {
              this.$message({ type: 'success', message: '撤销成功!' })
              this.getOrderList()
            })
            break
          case 18:
            revokeDispatchIn(data).then(() => {
              this.$message({ type: 'success', message: '撤销成功!' })
              this.getOrderList()
            })
            break
          case 19:
            revokeDispatchOut(data).then(() => {
              this.$message({ type: 'success', message: '撤销成功!' })
              this.getOrderList()
            })
            break
          case 20:
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
          type: this.otype,
          oid: row.id
        }
        switch (this.otype) {
          case 10:
          case 12:
          case 14:
          case 16:
            delIn(data).then(() => {
              this.$message({ type: 'success', message: '删除成功!' })
              this.getOrderList()
            })
            break
          case 11:
          case 13:
          case 15:
          case 17:
            delOut(data).then(() => {
              this.$message({ type: 'success', message: '删除成功!' })
              this.getOrderList()
            })
            break
          case 18:
            delDispatchIn(data).then(() => {
              this.$message({ type: 'success', message: '删除成功!' })
              this.getOrderList()
            })
            break
          case 19:
            delDispatchOut(data).then(() => {
              this.$message({ type: 'success', message: '删除成功!' })
              this.getOrderList()
            })
            break
          case 20:
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
