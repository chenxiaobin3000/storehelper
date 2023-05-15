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
      <el-table-column label="批次" width="170px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.batch }} </span>
          <el-button icon="el-icon-tickets" size="mini" circle @click="handleDetail(row)" />
        </template>
      </el-table-column>
      <el-table-column label="仓库" width="140px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sname }} </span>
        </template>
      </el-table-column>
      <el-table-column label="商品" width="260px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.commList }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.complete == 0 ? '未完成' : '已完成' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="180" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleEdit(row)">修改</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getOrderList" />

    <el-dialog title="修改物流信息" :visible.sync="dialogVisible">
      <el-form :model="temp" label-position="left" label-width="70px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="物流" prop="ship">
          <el-input v-model="temp.ship" />
        </el-form-item>
        <el-form-item label="车牌" prop="code">
          <el-input v-model="temp.code" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="temp.phone" />
        </el-form-item>
        <el-form-item label="运费" prop="fare">
          <el-input v-model="temp.fare" />
        </el-form-item>
        <el-form-item label="备注" prop="sremark">
          <el-input v-model="temp.remark" />
        </el-form-item>
        <div align="center">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="updateFare()">确定</el-button>
        </div>
      </el-form>
    </el-dialog>

    <el-dialog title="订单信息" :visible.sync="dialogDetailVisible">
      <el-form :model="tempDetail" label-position="left" label-width="70px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="批次" prop="batch">
          <span>{{ tempDetail.batch }}</span>
        </el-form-item>
        <el-form-item label="仓库" prop="sname">
          <span>{{ tempDetail.sname }}</span>
        </el-form-item>

        <!-- 商品列表 -->
        <el-form-item v-if="tempDetail.comms && tempDetail.comms.length > 0" label="商品列表" prop="remarks">
          <el-table :data="tempDetail.comms" style="width: 100%" border stripe fit highlight-current-row>
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
        <el-form-item v-if="tempDetail.imageList && tempDetail.imageList.length > 0">
          <span>附件列表</span><br>
          <el-image
            v-for="image in tempDetail.imageList"
            :key="image"
            :src="image"
            :preview-src-list="tempDetail.imageList"
            style="width: 100px; height: 100px"
          />
        </el-form-item>
        <el-form-item v-else label="附件列表" prop="attrs">
          <span>没有附件</span>
        </el-form-item>

        <!-- 备注列表 -->
        <el-form-item v-if="tempDetail.remarks && tempDetail.remarks.length > 0" label="备注列表" prop="remarks">
          <el-table :data="tempDetail.remarks" style="width: 100%" border stripe fit highlight-current-row>
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
import { setOrderFare, delOrderFare, getPurchaseFareList } from '@/api/transport'

export default {
  components: { Pagination },
  data() {
    return {
      tableHeight: 600,
      userdata: {},
      business: 1, // 业务类型
      orders: [{
        id: 1, label: '进货单'
      }, {
        id: 2, label: '退货单'
      }],
      date: new Date(),
      list: null,
      total: 0,
      reviewList: reviewType,
      completeList: completeType,
      loading: false,
      listQuery: {
        id: 0,
        gid: 0,
        type: 1, // 采购进货
        page: 1,
        limit: 10,
        review: 1, // 全部
        complete: 0, // 全部
        date: null,
        search: null
      },
      temp: {
        id: 0,
        oid: 0,
        ship: '',
        code: '',
        phone: '',
        fare: 0,
        remark: ''
      },
      tempDetail: {
        batch: '',
        sname: '',
        maccount: '',
        comms: [],
        attrs: [],
        imageList: [],
        remark: ''
      },
      dialogVisible: false,
      dialogDetailVisible: false
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
    this.listQuery.gid = this.userdata.group.id
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
      getPurchaseFareList(
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
        this.loading = false
      }).catch(error => {
        this.loading = false
        Promise.reject(error)
      })
    },
    handleDetail(row) {
      this.tempDetail = Object.assign({}, row)
      this.tempDetail.imageList = []
      if (this.tempDetail.attrs && this.tempDetail.attrs.length > 0) {
        this.tempDetail.attrs.forEach(v => {
          this.tempDetail.imageList.push(ImageSrc[v.src] + v.path + '/' + v.name)
        })
      }
      this.dialogDetailVisible = true
    },
    handleEdit(row) {
      this.temp = Object.assign({}, row)
      this.dialogVisible = true
    },
    updateFare() {
      setOrderFare({
        id: this.userdata.user.id,
        fid: this.temp.id,
        otype: this.business,
        oid: this.temp.oid,
        ship: this.temp.ship,
        code: this.temp.code,
        phone: this.temp.phone,
        fare: this.temp.fare,
        remark: this.temp.remark
      }).then(() => {
        this.$message({ type: 'success', message: '修改成功!' })
        this.getOrderList()
        this.dialogVisible = false
      })
    },
    handleDelete(row) {
      delOrderFare({
        id: this.userdata.user.id,
        otype: this.business,
        oid: row.id,
        fid: row.id
      }).then(() => {
        this.$message({ type: 'success', message: '删除成功!' })
        this.getOrderList()
      })
    }
  }
}
</script>
