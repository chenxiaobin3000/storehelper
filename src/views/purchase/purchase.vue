<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="list" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="类型" width="105px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.otype }}</span>
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
          <span>{{ row.sname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品" align="center">
        <template slot-scope="{row}">
          <span>{{ row.commList }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请人" width="65px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.applyName }} </span>
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
          <el-button type="primary" size="mini" @click="handleRevoke(row)">
            撤销审核
          </el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row)">
            删除
          </el-button>
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
        <el-table v-loading="loading" :data="temp.comms" style="width: 100%" fit highlight-current-row>
          <el-table-column label="商品列表" width="80px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column label="名称" align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="重量" width="60px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.unit }}克</span>
            </template>
          </el-table-column>
          <el-table-column label="数量" width="60px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.value }}</span>
            </template>
          </el-table-column>
          <el-table-column label="价格" width="60px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.price }}元</span>
            </template>
          </el-table-column>
        </el-table>
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">
          关闭
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination'
import ImageSrc from '@/utils/image-src'
import { getOrderType } from '@/utils/order'
import { getProductOrder } from '@/api/order'
import { revokeProcess, delProcess, revokeComplete, delComplete } from '@/api/product'

export default {
  components: { Pagination },
  data() {
    return {
      userdata: {},
      list: null,
      total: 0,
      loading: false,
      listQuery: {
        id: 0,
        type: 1,
        page: 1,
        limit: 20,
        search: null
      },
      temp: {},
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
  created() {
    this.listQuery.id = this.$store.getters.userdata.user.id
    this.userdata = this.$store.getters.userdata
    this.resetTemp()
    this.getOrderList()
  },
  methods: {
    resetTemp() {
      this.temp = {
        batch: '',
        sname: '',
        comms: [],
        attrs: [],
        imageList: []
      }
    },
    getOrderList() {
      this.loading = true
      getProductOrder(
        this.listQuery
      ).then(response => {
        this.total = response.data.data.total
        this.list = response.data.data.list
        console.log(response.data.data)
        this.list.forEach(v => {
          v.otype = getOrderType(v.type)
          v.commList = ''
          if (v.comms && v.comms.length > 0) {
            v.comms.forEach(c => {
              v.commList = v.commList + c.name + ','
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
    handleRevoke(row) {
      if (row.type !== 3 && row.type !== 4) {
        this.$message({ type: 'error', message: '订单类型异常，请联系管理员!' })
      }
      this.$confirm('确定要撤销吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (row.type === 4) {
          revokeProcess({
            id: this.userdata.user.id,
            oid: row.id
          }).then(response => {
            this.$message({ type: 'success', message: '撤销成功!' })
            this.getOrderList()
          })
        } else {
          revokeComplete({
            id: this.userdata.user.id,
            oid: row.id
          }).then(response => {
            this.$message({ type: 'success', message: '撤销成功!' })
            this.getOrderList()
          })
        }
      })
    },
    handleDelete(row) {
      if (row.type !== 3 && row.type !== 4) {
        this.$message({ type: 'error', message: '订单类型异常，请联系管理员!' })
      }
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (row.type === 4) {
          delProcess({
            id: this.userdata.user.id,
            oid: row.id
          }).then(response => {
            this.$message({ type: 'success', message: '删除成功!' })
            this.getOrderList()
          })
        } else {
          delComplete({
            id: this.userdata.user.id,
            oid: row.id
          }).then(response => {
            this.$message({ type: 'success', message: '删除成功!' })
            this.getOrderList()
          })
        }
      })
    }
  }
}
</script>
