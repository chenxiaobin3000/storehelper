<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.sid" class="filter-item" @change="handleStorageSelect">
        <el-option v-for="item in storages" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <span class="filter-item" style="color:#606266"> 账号: {{ temp.account }} ({{ temp.remark }}), 子账号:</span>
      <el-select v-model="listQuery.asid" class="filter-item" style="width:160px" @change="handleSubSelect">
        <el-option v-for="item in asoptions" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <span class="filter-item" style="color:#606266">{{ temp.sremark }}</span>
      <el-date-picker v-model="date" type="date" class="filter-item" style="width: 150px;" @change="handleSelect" />
      <span class="filter-item" style="color:#606266">{{ mname }}平台</span>
      <el-button type="primary" size="normal" style="float:right;width:100px" @click="handleApply()">提交</el-button>
    </div>

    <upload-excel-component :on-success="handleSuccess" />
    <br>

    <el-table v-loading="loading" :data="list" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="编号" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ccode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.cname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.cremark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="平台编号" width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mcode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="平台名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mname }} </span>
          <el-button icon="el-icon-document-copy" size="mini" circle @click="handleCopy(row)" />
        </template>
      </el-table-column>
      <el-table-column label="平台备注" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mremark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预警" width="60px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.alarm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单价" width="100px" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.mprice" />
        </template>
      </el-table-column>
      <el-table-column label="销量" width="100px" align="center">
        <template slot-scope="{row}">
          <el-input v-model="row.mvalue" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">更新</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getCommodityList" />

    <div class="filter-container" align="center">
      <span class="filter-item">----------  履约发货单信息  ----------</span>
    </div>
    <div v-if="temp.row" class="filter-container">
      <span class="filter-item" style="color:#606266">已选择订单: {{ temp.row.batch }},</span>
      <span class="filter-item" style="color:#606266"> 仓库: {{ temp.row.sname }},</span>
      <span class="filter-item" style="color:#606266"> 账号: {{ temp.row.msaccount && temp.row.msaccount.length > 0 ? temp.row.msaccount : temp.row.maccount }},</span>
      <span class="filter-item" style="color:#606266"> 备注: {{ temp.row.msaccount && temp.row.msaccount.length > 0 ? temp.row.msremark : temp.row.mremark }}.</span>
      <br>
      <span class="filter-item" style="color:#606266"> 商品: {{ temp.row.commList }}</span>
      <br>
      <span class="filter-item" style="color:#606266"> 总价: {{ temp.row.price }},</span>
      <span class="filter-item" style="color:#606266"> 现价: {{ temp.row.curPrice }},</span>
      <span class="filter-item" style="color:#606266"> 总数: {{ temp.row.value }},</span>
      <span class="filter-item" style="color:#606266"> 存量: {{ temp.row.curValue }}.</span>
    </div>
    <div class="filter-container">
      <el-select v-model="listAgree.review" class="filter-item" style="width:100px" @change="handleAgreeSelect">
        <el-option v-for="item in reviewList" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <el-select v-model="listAgree.complete" class="filter-item" style="width:100px" @change="handleAgreeSelect">
        <el-option v-for="item in completeList" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <el-date-picker v-model="agreeDate" type="date" class="filter-item" style="width:160px" placeholder="请输入查询日期" @change="handleAgreeSelect" />
      <el-input v-model="listAgree.search" class="filter-item" style="width:200px" placeholder="请输入商品名称" @change="handleAgreeSelect" />
    </div>
    <el-table v-loading="loading" :data="agrees" style="width: 100%" border fit highlight-current-row>
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

    <pagination v-show="agreeTotal>0" :total="agreeTotal" :page.sync="listAgree.page" :limit.sync="listAgree.limit" @pagination="getAgreementList" />

    <el-dialog title="平台销售单信息" :visible.sync="dialogVisible">
      <el-form :model="temp" label-position="left" label-width="70px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="制单日期" prop="date">
          <span>{{ temp.date }}</span>
        </el-form-item>
        <el-form-item label="仓库" prop="storage">
          <span>{{ temp.storage }}</span>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <span>{{ temp.saccount.length > 0 ? temp.saccount+'('+temp.sremark+')' : temp.account+'('+temp.remark+')' }}</span>
        </el-form-item>
        <el-form-item label="履约单" prop="order">
          <span>{{ temp.row ? temp.row.batch : '' }}</span>
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
          <el-table-column label="备注" align="center">
            <template slot-scope="{row}">
              <span>{{ row.remark }}</span>
            </template>
          </el-table-column>
          <el-table-column label="总价 / 单价" width="120px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.all }} / {{ row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column label="核销" width="80px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.real }}</span>
            </template>
          </el-table-column>
          <el-table-column label="销量 / 存量" width="100px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.value }} / {{ row.stock }}</span>
            </template>
          </el-table-column>
        </el-table>
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
import { marketArr } from '@/utils/market-data'
import Pagination from '@/components/Pagination'
import UploadExcelComponent from '@/components/UploadExcel'
import { setMarketCommList, setMarketCommDetail, delMarketCommDetail, getMarketCommDetail, getMarketSaleDetail } from '@/api/market'
import { getAgreementOrder } from '@/api/order'
import { getGroupAllStorage } from '@/api/storage'
import { sale } from '@/api/sale'

export default {
  components: { Pagination, UploadExcelComponent },
  data() {
    return {
      userdata: {},
      storages: [],
      asoptions: [],
      mid: 0,
      mname: '',
      date: new Date(),
      list: null,
      total: 0,
      loading: false,
      listQuery: {
        id: 0,
        gid: 0,
        page: 1,
        limit: 10,
        sid: 0,
        aid: 0,
        asid: 0,
        date: null,
        search: null
      },
      reviewList: reviewType,
      completeList: completeType,
      agreeDate: '',
      agreeLoading: false,
      agreeTotal: 0,
      agrees: [],
      listAgree: {
        id: 0,
        aid: 0,
        asid: 0,
        type: 20, // 履约发货
        page: 1,
        limit: 10,
        review: 2, // 已审核
        complete: 2, // 未完成
        date: null,
        search: null
      },
      temp: {
        row: null,
        storage: '',
        account: '',
        remark: '',
        saccount: '',
        sremark: '',
        date: null,
        list: []
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
    this.listQuery.date = parseTime(this.date, '{y}-{m}-{d}')
    this.listAgree.id = this.userdata.user.id
    this.getGroupAllStorage()
  },
  methods: {
    handleSelect() {
      this.listQuery.page = 1
      this.listQuery.limit = 10
      this.listQuery.date = parseTime(this.date, '{y}-{m}-{d}')
      this.getCommodityList()
    },
    handleStorageSelect() {
      this.listQuery.page = 1
      this.listQuery.limit = 10
      this.getMarketStorageAccount()
    },
    handleSubSelect() {
      this.asoptions.forEach(v => {
        if (this.listQuery.asid === v.id) {
          this.temp.saccount = v.label
          this.temp.sremark = v.remark
          this.handleMarket(v.mid)
        }
      })
      this.handleSelect()
    },
    handleAgreeSelect() {
      this.listAgree.aid = this.listQuery.aid
      this.listAgree.asid = this.listQuery.asid
      this.listAgree.page = 1
      this.listAgree.limit = 20
      this.listAgree.date = parseTime(this.agreeDate, '{y}-{m}-{d}')
      this.getAgreementList()
    },
    handleSelectOrder(row) {
      this.temp.row = Object.assign({}, row)
    },
    handleMarket(id) {
      this.mid = id
      this.mname = marketArr[id]
    },
    handleSuccess({ results, header }) {
      const commoditys = []
      const prices = []
      const values = []
      let idName = ''
      let priceName = ''
      let valueName = ''
      switch (this.mid) {
        case 1: // 拼多多
          idName = '商品ID'
          priceName = '商家报价（元）'
          valueName = '商品总数'
          break
        case 2: // 美团
          this.$message({ type: 'error', message: '暂不支持导入美团平台数据!' })
          return
        case 3: // 快驴
          idName = '商品编号'
          priceName = '商品单价/业务单价'
          valueName = '下单数量/业务数量'
          break
        case 4: // 美莱
          idName = 'ID编号'
          priceName = '商品单价'
          valueName = '下单量'
          break
        case 5: // 淘菜菜
          this.$message({ type: 'error', message: '暂不支持导入淘菜菜平台数据!' })
          return
        default:
          this.$message({ type: 'error', message: '请选择要导入的平台!' })
          return
      }
      results.forEach(v => {
        if (v[idName] && v[idName].length > 0) {
          commoditys.push(v[idName])
          prices.push(v[priceName])
          values.push(v[valueName])
        }
      })
      setMarketCommList({
        id: this.listQuery.id,
        gid: this.userdata.group.id,
        sid: this.listQuery.sid,
        aid: this.listQuery.aid,
        asid: this.listQuery.asid,
        date: this.listQuery.date,
        commoditys: commoditys,
        prices: prices,
        values: values
      }).then(response => {
        this.$message({ type: 'success', message: '更新成功!' })
        this.getCommodityList()
      })
    },
    getMarketSubAccount() {
      getMarketSubAccount({
        id: this.listQuery.id,
        gid: this.listQuery.gid,
        aid: this.listQuery.aid
      }).then(response => {
        if (response.data.data.list && response.data.data.list.length > 0) {
          this.asoptions = []
          response.data.data.list.forEach(v => {
            this.asoptions.push({ id: v.id, label: v.account, remark: v.remark, mid: v.mid })
          })
          this.listQuery.asid = this.asoptions[0].id
          this.temp.saccount = this.asoptions[0].label
          this.temp.sremark = this.asoptions[0].remark
          this.handleMarket(this.asoptions[0].mid)
        } else {
          this.asoptions = [{ id: 0, label: '无' }]
          this.listQuery.asid = 0
          this.temp.saccount = ''
          this.temp.sremark = ''
        }
        this.listQuery.date = parseTime(this.date, '{y}-{m}-{d}')
        this.getCommodityList()
        this.handleAgreeSelect()
      })
    },
    getMarketStorageAccount() {
      getMarketStorageAccount({
        id: this.listQuery.id,
        gid: this.userdata.group.id,
        cid: this.listQuery.sid
      }).then(response => {
        const data = response.data.data
        this.listQuery.aid = data.aid
        this.temp.account = data.account
        this.temp.remark = data.remark
        this.handleMarket(data.mid)
        this.getMarketSubAccount()
      }).catch(error => {
        this.temp.account = ''
        this.temp.remark = ''
        this.asoptions = [{ id: 0, label: '无' }]
        this.listQuery.asid = 0
        this.temp.saccount = ''
        this.temp.sremark = ''
        this.getCommodityList()
        Promise.reject(error)
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
          this.getMarketStorageAccount()
        }
      })
    },
    getCommodityList() {
      this.loading = true
      getMarketCommDetail(
        this.listQuery
      ).then(response => {
        this.total = response.data.data.total
        this.list = response.data.data.list
        this.loading = false
      }).catch(error => {
        this.loading = false
        Promise.reject(error)
      })
    },
    getAgreementList() {
      this.agreeLoading = true
      getAgreementOrder(
        this.listAgree
      ).then(response => {
        this.agreeTotal = response.data.data.total
        this.agrees = response.data.data.list
        this.agrees.forEach(v => {
          v.commList = ''
          if (v.comms && v.comms.length > 0) {
            v.comms.forEach(c => {
              if (v.commList.length < 20) {
                v.commList = v.commList + c.name + ','
              }
            })
          }
        })
        this.agreeLoading = false
      }).catch(error => {
        this.agreeLoading = false
        Promise.reject(error)
      })
    },
    handleCopy(row) {
      const temp = {
        id: this.listQuery.id,
        gid: this.userdata.group.id,
        sid: this.listQuery.sid,
        aid: this.listQuery.aid,
        asid: this.listQuery.asid,
        did: 0,
        cid: row.cid,
        value: row.mvalue,
        price: row.mprice,
        date: this.listQuery.date
      }
      setMarketCommDetail(temp).then(response => {
        this.$message({ type: 'success', message: '复制成功!' })
        this.getCommodityList()
      })
    },
    handleUpdate(row) {
      if (!row.mprice) {
        this.$message({ type: 'error', message: '请填写单价!' })
        return
      }
      if (!row.mvalue) {
        this.$message({ type: 'error', message: '请填写销量!' })
        return
      }
      const temp = {
        id: this.listQuery.id,
        gid: this.userdata.group.id,
        sid: this.listQuery.sid,
        aid: this.listQuery.aid,
        asid: this.listQuery.asid,
        did: row.id ? row.id : 0,
        cid: row.cid,
        value: row.mvalue,
        price: row.mprice,
        date: this.listQuery.date
      }
      setMarketCommDetail(temp).then(response => {
        this.$message({ type: 'success', message: '修改成功!' })
        this.getCommodityList()
      })
    },
    handleDelete(row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const temp = {
          id: this.listQuery.id,
          gid: this.userdata.group.id,
          did: row.id
        }
        delMarketCommDetail(temp).then(response => {
          this.$message({ type: 'success', message: '删除成功!' })
          this.getCommodityList()
        })
      })
    },
    handleApply() {
      if (!this.temp.row) {
        this.$message({ type: 'error', message: '请选择履约发货单!' })
        return
      }
      getMarketSaleDetail(
        this.listQuery
      ).then(response => {
        this.temp.list = response.data.data.list
        if (this.temp.list.length <= 0) {
          this.$message({ type: 'error', message: '未查询到销售数据!' })
          return
        }
        this.storages.forEach(v => {
          if (v.id === this.listQuery.sid) {
            this.temp.storage = v.label
          }
        })
        this.temp.date = parseTime(this.date, '{y}-{m}-{d}') + parseTime(new Date(), ' {h}:{i}:{s}')

        // 校验履约单商品数量
        const total = this.temp.row.comms.length
        const comms = this.temp.row.comms
        this.temp.list.forEach(v => {
          let find = false
          for (let i = 0; i < total; i++) {
            const c = comms[i]
            if (c.cid === v.cid) {
              if (c.curValue < v.value) {
                v.real = c.curValue
              } else {
                v.real = v.value
              }
              v.all = v.price * v.real
              v.stock = c.curValue
              find = true
              break
            }
          }
          if (!find) {
            v.all = '-'
            v.real = '-'
            v.stock = '-'
          }
        })
        this.dialogVisible = true
      })
    },
    applyData() {
      sale({
        id: this.userdata.user.id,
        gid: this.userdata.group.id,
        sid: this.listQuery.sid,
        pid: this.temp.row.id,
        date: this.temp.date
      }).then(response => {
        this.$message({ type: 'success', message: '申请成功!' })
        this.dialogVisible = false
      })
    }
  }
}
</script>
