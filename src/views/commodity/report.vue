<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="marketId" class="filter-item" @change="handleSelect">
        <el-option v-for="item in moptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="ctype" class="filter-item" @change="handleSelect">
        <el-option v-for="item in coptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="cycle" class="filter-item" @change="handleSelect">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>

    <el-table v-loading="loading" :data="list" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="编号" width="140px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.code }} </span>
          <el-button icon="el-icon-tickets" size="mini" circle @click="handleDetail(row)" />
        </template>
      </el-table-column>
      <el-table-column label="名称" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总价格" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总销量" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="7天数据（循环）/周/月" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getCommodityList" />

    <el-dialog title="详细信息" :visible.sync="dialogVisible">
      <el-form :model="temp" label-position="left" label-width="60px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="编号" prop="code">
          <span>{{ temp.code }}</span>
        </el-form-item>
        <el-form-item label="名称" prop="name">
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
          关闭
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { filterMarket, reportCycle } from '@/utils'
import Pagination from '@/components/Pagination'
import { getGroupCommodity } from '@/api/commodity'
import { getGroupCategoryTree } from '@/api/category'
import { getGroupAttrTemp } from '@/api/attribute'

export default {
  components: { Pagination },
  data() {
    return {
      userdata: {},
      marketId: 0,
      moptions: [],
      ctype: 0,
      coptions: [{
        value: 0, label: '全部'
      }, {
        value: 1, label: '商品'
      }, {
        value: 4, label: '标品'
      }],
      cycle: 1,
      options: reportCycle,
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
    this.moptions = filterMarket(this.userdata.market, true)
    this.listQuery.id = this.userdata.user.id
    this.getCategoryList()
    this.getGroupAttrTemp()
    this.getCommodityList()
  },
  methods: {
    handleSelect() {
      this.getCommodityList()
    },
    getCommodityList() {
      this.loading = true
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
                v.category = c.label
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
    },
    getCategoryList() {
      getGroupCategoryTree({
        id: this.userdata.user.id
      }).then(response => {
        this.generator(response.data.data.list)
      })
    },
    generator(tree) {
      tree.forEach(v => {
        this.categoryList.push(v)
        if (v.children != null) {
          this.generator(v.children)
        }
      })
    },
    getGroupAttrTemp() {
      getGroupAttrTemp({
        id: this.userdata.user.id,
        atid: 1
      }).then(response => {
        this.templateList = response.data.data.list
      })
    },
    handleDetail(row) {
      this.temp = {
        id: row.id,
        code: row.code,
        name: row.name,
        category: row.category,
        attribute: row.attribute,
        price: row.price,
        unit: row.unit,
        remark: row.remark
      }
      this.dialogVisible = true
    }
  }
}
</script>
