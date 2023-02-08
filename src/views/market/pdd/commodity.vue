<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="ctype" class="filter-item" @change="handleSelect">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>

    <el-table v-loading="loading" :data="list" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="平台名称" width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="编号" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="内部名称" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="品类" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.category }}</span>
        </template>
      </el-table-column>
      <el-table-column label="属性" width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.attribute }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单位" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.unit }}克</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.price }}元</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getCommodityList" />

    <el-dialog title="修改平台对接商品信息" :visible.sync="dialogVisible">
      <el-form :model="temp" label-position="left" label-width="70px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="平台名称" prop="name">
          <el-input v-model="temp.mname" />
        </el-form-item>
        <el-form-item label="编号" prop="name">
          <span>{{ temp.code }}</span>
        </el-form-item>
        <el-form-item label="内部名称" prop="name">
          <span>{{ temp.name }}</span>
        </el-form-item>
        <el-form-item label="品类" prop="category">
          <span>{{ temp.category }}</span>
        </el-form-item>
        <el-form-item label="属性" prop="attribute">
          <span>{{ temp.attribute }}</span>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <span>{{ temp.price }}</span>
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <span>{{ temp.unit }}</span>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <span>{{ temp.remark }}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination'
import { getGroupCommodity } from '@/api/commodity'
import { getGroupStandard } from '@/api/standard'
import { setMarketCommodity, delMarketCommodity } from '@/api/market'
import { getGroupCategoryList } from '@/api/category'
import { getGroupAttrTemp } from '@/api/attribute'

export default {
  components: { Pagination },
  data() {
    return {
      marketId: 1, // pdd
      userdata: {},
      ctype: 1,
      options: [{
        value: 1, label: '商品'
      }, {
        value: 4, label: '标品'
      }],
      list: null,
      total: 0,
      categoryList: [],
      templateList: {},
      loading: false,
      listQuery: {
        id: 0,
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
      this.getCommodityList()
    },
    create() {
      this.$message({ type: 'error', message: '不支持新建!' })
    }
  },
  created() {
    this.userdata = this.$store.getters.userdata
    this.listQuery.id = this.userdata.user.id
    this.resetTemp()
    this.getCategoryList()
    this.getGroupAttrTemp()
    this.getCommodityList()
  },
  methods: {
    resetTemp() {
      this.temp = {
        mname: '',
        id: 0,
        code: '',
        name: '',
        category: null,
        attribute: '',
        price: 0,
        unit: 0,
        remark: ''
      }
    },
    handleSelect() {
      this.listQuery.page = 1
      this.listQuery.limit = 20
      this.getCommodityList()
    },
    getCommodityList() {
      this.loading = true
      if (this.ctype === 1) {
        getGroupCommodity(
          this.listQuery
        ).then(response => {
          this.total = response.data.data.total
          this.list = []
          if (response.data.data.list && response.data.data.list.length > 0) {
            response.data.data.list.forEach(v => {
              // 品类
              this.categoryList.forEach(c => {
                if (c.id === v.cid) {
                  v.category = c.name
                }
              })
              // 属性
              let idx = 0
              v.attribute = ''
              this.templateList.forEach(t => {
                v.attribute = v.attribute + t + ': ' + v.attrs[idx++] + ', '
              })
              this.list.push(v)
            })
          }
          this.loading = false
        }).catch(error => {
          this.loading = false
          Promise.reject(error)
        })
      } else {
        getGroupStandard(
          this.listQuery
        ).then(response => {
          this.total = response.data.data.total
          this.list = []
          if (response.data.data.list && response.data.data.list.length > 0) {
            response.data.data.list.forEach(v => {
              // 品类
              this.categoryList.forEach(c => {
                if (c.id === v.cid) {
                  v.category = c.name
                }
              })
              // 属性
              let idx = 0
              v.attribute = ''
              this.templateList.forEach(t => {
                v.attribute = v.attribute + t + ': ' + v.attrs[idx++] + ', '
              })
              this.list.push(v)
            })
          }
          this.loading = false
        }).catch(error => {
          this.loading = false
          Promise.reject(error)
        })
      }
    },
    getCategoryList() {
      getGroupCategoryList({
        id: this.userdata.user.id
      }).then(response => {
        this.categoryList = response.data.data.list
      })
    },
    getGroupAttrTemp() {
      getGroupAttrTemp({
        id: this.userdata.user.id,
        atid: this.ctype
      }).then(response => {
        this.templateList = response.data.data.list
      })
    },
    handleUpdate(row) {
      this.temp = {
        mname: row.mname,
        id: row.id,
        cid: row.cid,
        code: row.code,
        name: row.name,
        categoryName: row.categoryName,
        attribute: row.attribute,
        price: row.price,
        unit: row.unit,
        remark: row.remark
      }
      this.dialogVisible = true
    },
    updateData() {
      setMarketCommodity({
        id: this.userdata.user.id,
        gid: this.userdata.group.id,
        mid: this.marketId,
        cid: this.temp.cid,
        name: this.temp.mname,
        price: this.temp.price
      }).then(response => {
        this.$message({ type: 'success', message: '修改成功!' })
        this.getCommodityList()
        this.dialogVisible = false
      })
    },
    handleDelete(row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delMarketCommodity({
          id: this.userdata.user.id,
          gid: this.userdata.group.id,
          did: row.id
        }).then(response => {
          this.$message({ type: 'success', message: '删除成功!' })
          this.getStandardList()
        })
      })
    }
  }
}
</script>
