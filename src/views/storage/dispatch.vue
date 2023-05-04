<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="otype" class="filter-item" style="width:120px" @change="handleTypeSelect">
        <el-option v-for="item in orders" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.sid" class="filter-item" @change="handleSelect">
        <el-option v-for="item in storages" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <el-select v-if="otype!==19" v-model="listQuery.review" class="filter-item" style="width:100px" @change="handleSelect">
        <el-option v-for="item in reviewList" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <el-select v-if="otype!==19" v-model="listQuery.complete" class="filter-item" style="width:100px" @change="handleSelect">
        <el-option v-for="item in completeList" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <el-date-picker v-model="date" type="date" class="filter-item" style="width: 150px;" @change="handleSelect" />
      <el-select v-if="otype===19" v-model="itype" class="filter-item" style="width:100px" @change="handleIOSelect">
        <el-option v-for="item in ioptions" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <span v-if="otype===19" class="filter-item" style="color:#606266">{{ ioremark }}</span>
      <el-button type="primary" size="normal" style="float:right;width:100px" @click="handleApply()">提交</el-button>
    </div>

    <el-table v-if="otype===11||otype===13||otype===15||otype===17" ref="table" v-loading="loading" :data="list" :height="tableHeight" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="批次" fixed="left" width="180px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.batch }} </span>
          <el-button icon="el-icon-tickets" size="mini" circle @click="handleDetail(row)" />
        </template>
      </el-table-column>
      <el-table-column label="仓库" width="140px" align="center">
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
      <el-table-column label="操作" align="center" fixed="right" width="90" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleSelectOrder(row)">选择</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-table v-if="otype===19" ref="table" v-loading="loading" :data="list" :height="tableHeight" style="width: 100%" border fit highlight-current-row>
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
      <span class="filter-item">----------  {{ oname }}信息  ----------</span>
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
      <el-table-column label="操作" align="center" fixed="right" width="90" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="danger" size="mini" @click="handleDeleteCommodity(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="oname" :visible.sync="dialogVisible">
      <el-form :model="temp" label-position="left" label-width="70px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item v-if="otype!==18" label="单号" prop="ccode">
          <span>{{ temp.batch }}</span>
        </el-form-item>
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

        <!-- 物流 -->
        <div v-if="otype===19">
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
        </div>

        <el-form-item label="一键审核" prop="autoReview">
          <el-switch v-model="temp.autoReview" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="applyData()">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="订单信息" :visible.sync="dialogInfoVisible">
      <el-form :model="tempInfo" label-position="left" label-width="70px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="批次" prop="batch">
          <span>{{ tempInfo.batch }}</span>
        </el-form-item>
        <el-form-item label="仓库" prop="sname">
          <span>{{ tempInfo.sname }}</span>
        </el-form-item>

        <!-- 商品列表 -->
        <el-form-item v-if="tempInfo.comms && tempInfo.comms.length > 0" label="商品列表" prop="remarks">
          <el-table :data="tempInfo.comms" style="width: 100%" border stripe fit highlight-current-row>
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
                <span>{{ row.weight }}kg</span>
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

        <!-- 运费列表 -->
        <el-form-item v-if="tempInfo.fares && tempInfo.fares.length > 0" label="运费列表" prop="fares">
          <el-table :data="tempInfo.fares" style="width: 100%" border stripe fit highlight-current-row>
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

        <!-- 附件列表 -->
        <el-form-item v-if="tempInfo.imageList && tempInfo.imageList.length > 0">
          <span>附件列表</span><br>
          <el-image
            v-for="image in tempInfo.imageList"
            :key="image"
            :src="image"
            :preview-src-list="tempInfo.imageList"
            style="width: 100px; height: 100px"
          />
        </el-form-item>
        <el-form-item v-else label="附件列表" prop="attrs">
          <span>没有附件</span>
        </el-form-item>

        <!-- 备注列表 -->
        <el-form-item v-if="tempInfo.remarks && tempInfo.remarks.length > 0" label="备注列表" prop="remarks">
          <el-table :data="tempInfo.remarks" style="width: 100%" border stripe fit highlight-current-row>
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
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { parseTime, reviewType, completeType } from '@/utils'
import Pagination from '@/components/Pagination'
import ImageSrc from '@/utils/image-src'
import { getGroupCategoryList } from '@/api/category'
import { getGroupAttrTemp } from '@/api/attribute'
import { getStorageCommodity } from '@/api/commodity'
import { addOrderRemark, getPurchaseOrder, getProductOrder, getAgreementOrder, getOfflineOrder } from '@/api/order'
import { sout, dispatchOut, getGroupAllStorage } from '@/api/storage'
import { addOrderFare } from '@/api/transport'

export default {
  components: { Pagination },
  data() {
    return {
      tableHeight: 600,
      userdata: {},
      business: 2, // 业务类型
      otype: 11,
      orders: [{
        id: 11, label: '采购出库单'
      }, {
        id: 13, label: '生产出库单'
      }, {
        id: 15, label: '履约出库单'
      }, {
        id: 17, label: '销售出库单'
      }, {
        id: 19, label: '仓储出库单'
      }],
      oname: '',
      itype: 1,
      ioptions: [{
        id: 1, label: '标准'
      }, {
        id: 2, label: '超码'
      }],
      ioremark: '',
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
        sid: 0,
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
        ship: '',
        code: '',
        phone: '',
        fare: 0,
        remark: '',
        sremark: ''
      },
      tempInfo: {
        id: 0,
        batch: '',
        sname: '',
        comms: [],
        attrs: [],
        imageList: [],
        remark: ''
      },
      dialogVisible: false,
      dialogInfoVisible: false
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
    this.getCategoryList()
    this.handleIOSelect()
  },
  methods: {
    handleTypeSelect() {
      this.temp.list = []
      this.orders.forEach(v => {
        if (this.otype === v.id) {
          this.oname = v.label
        }
      })
      this.handleSelect()
    },
    handleSelect() {
      this.listQuery.page = 1
      this.listQuery.limit = 10
      this.listQuery.date = parseTime(this.date, '{y}{m}{d}')
      this.listQuery.date = this.listQuery.date.substr(2, this.listQuery.date.length - 2)
      this.getCommodityList()
    },
    handleIOSelect() {
      if (this.itype === 1) {
        this.ioremark = '总价 = 单价 * 份数，总重量 = 克重 * 份数'
      } else {
        this.ioremark = '原料总价 = 单价 * 重量'
      }
    },
    handleDetail(row) {
      this.tempInfo = Object.assign({}, row)
      this.tempInfo.imageList = []
      if (this.tempInfo.attrs && this.tempInfo.attrs.length > 0) {
        this.tempInfo.attrs.forEach(v => {
          this.tempInfo.imageList.push(ImageSrc[v.src] + v.path + '/' + v.name)
        })
      }
      this.dialogInfoVisible = true
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
          this.handleTypeSelect()
        }
      })
    },
    getCommodityList() {
      this.loading = true
      switch (this.otype) {
        case 11:
          getPurchaseOrder(this.listQuery).then(response => {
            this.handleRet(response)
          }).catch(error => {
            this.loading = false
            Promise.reject(error)
          })
          break
        case 13:
          getProductOrder(this.listQuery).then(response => {
            this.handleRet(response)
          }).catch(error => {
            this.loading = false
            Promise.reject(error)
          })
          break
        case 15:
          getAgreementOrder(this.listQuery).then(response => {
            this.handleRet(response)
          }).catch(error => {
            this.loading = false
            Promise.reject(error)
          })
          break
        case 17:
          getOfflineOrder(this.listQuery).then(response => {
            this.handleRet(response)
          }).catch(error => {
            this.loading = false
            Promise.reject(error)
          })
          break
        case 19:
          getStorageCommodity(this.listQuery).then(response => {
            const data = response.data.data
            this.total = data.total
            this.list = []
            if (data.list && data.list.length > 0) {
              data.list.forEach(v => {
                // 初始化数据
                v.iprice = v.svalue ? (v.sprice / v.svalue).toFixed(2) : 0
                v.iweight = v.svalue ? (v.sweight / v.svalue / 1000).toFixed(2) : 0
                v.inorm = v.snorm
                v.ivalue = v.svalue

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
          break
        default:
          break
      }
    },
    handleRet(response) {
      this.total = response.data.data.total
      this.list = response.data.data.list
      if (this.list && this.list.length > 0) {
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
      }
      this.loading = false
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
    handleSelectOrder(row) {
      this.temp.id = row.id
      this.temp.batch = row.batch
      this.storages.forEach(v => {
        if (v.label === row.sname) {
          this.listQuery.sid = v.id
        }
      })
      row.comms.forEach(v => {
        this.temp.list.push(v)
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
        ship: '',
        code: '',
        phone: '',
        fare: '',
        remark: '',
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
      const data = {
        id: this.userdata.user.id,
        gid: this.userdata.group.id,
        sid: this.listQuery.sid,
        type: this.otype,
        oid: this.temp.id,
        date: this.temp.date,
        review: this.temp.autoReview ? 1 : 0,
        commoditys: this.temp.commoditys,
        prices: this.temp.prices,
        weights: this.temp.weights,
        norms: this.temp.norms,
        values: this.temp.values,
        attrs: []
      }
      if (this.otype === 19) {
        dispatchOut(
          data
        ).then(response => {
          this.handleRet2(response)
        })
      } else {
        sout(
          data
        ).then(response => {
          this.handleRet2(response)
        })
      }
    },
    handleRet2(response) {
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
      this.list = []
      this.dialogVisible = false
    }
  }
}
</script>
