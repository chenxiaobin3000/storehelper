<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="otype" class="filter-item" style="width:120px" @change="handleSelect">
        <el-option v-for="item in orders" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="ctype" class="filter-item" style="width:100px" @change="handleSelect">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="listQuery.sid" class="filter-item" @change="handleStorageSelect">
        <el-option v-for="item in soptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-date-picker v-model="date" type="date" class="filter-item" style="width: 150px;" />
    </div>

    <el-table v-loading="loading" :data="list" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="编号" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ccode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.cname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="品类" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.categoryName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="属性" align="center">
        <template slot-scope="{row}">
          <span>{{ row.attribute }}</span>
        </template>
      </el-table-column>
      <el-table-column label="成本" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.price }}元</span>
        </template>
      </el-table-column>
      <el-table-column label="库存" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.svalue }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.cremark }}</span>
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

    <el-dialog title="采购单信息" :visible.sync="dialogVisible">
      <el-form :model="temp" label-position="left" label-width="70px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="编号" prop="ccode">
          <span>{{ temp.ccode }}</span>
        </el-form-item>
        <el-form-item label="名称" prop="cname">
          <span>{{ temp.cname }}</span>
        </el-form-item>
        <el-form-item label="备注" prop="cremark">
          <span>{{ temp.cremark }}</span>
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
import { getGroupAllStorage } from '@/api/storage'
import { getGroupCategoryList } from '@/api/category'
import { getGroupAttrTemp } from '@/api/attribute'
import { getStorageStandard } from '@/api/standard'
import { getStorageCommodity } from '@/api/commodity'
import { getStorageHalfgood } from '@/api/halfgood'
import { getStorageOriginal } from '@/api/original'

export default {
  components: { Pagination },
  data() {
    return {
      userdata: {},
      soptions: [],
      asoptions: [],
      otype: 1,
      orders: [{
        value: 1, label: '采购进货单'
      }, {
        value: 2, label: '采购退货单'
      }],
      ctype: 4,
      options: [{
        value: 4, label: '标品'
      }, {
        value: 1, label: '商品'
      }, {
        value: 2, label: '半成品'
      }, {
        value: 3, label: '原料'
      }],
      date: new Date(),
      list: null,
      total: 0,
      categoryList: [],
      templateList: {},
      loading: false,
      listQuery: {
        id: 0,
        gid: 0,
        page: 1,
        limit: 20,
        sid: 0,
        aid: 0,
        asid: 0,
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
  async created() {
    this.userdata = this.$store.getters.userdata
    this.listQuery.id = this.userdata.user.id
    this.listQuery.gid = this.userdata.group.id
    this.resetTemp()
    this.getCategoryList()
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
    handleStorageSelect() {
      this.listQuery.page = 1
      this.listQuery.limit = 20
      this.getCommodityList()
    },
    getGroupAllStorage() {
      getGroupAllStorage({
        id: this.userdata.user.id
      }).then(response => {
        if (response.data.data.list && response.data.data.list.length > 0) {
          response.data.data.list.forEach(v => {
            this.soptions.push({ value: v.id, label: v.name })
          })
          this.listQuery.sid = response.data.data.list[0].id
          this.getCommodityList()
        }
      })
    },
    getCommodityList() {
      this.loading = true
      switch (this.ctype) {
        case 1:
          getStorageOriginal(
            this.listQuery
          ).then(response => {
            this.handleRet(response.data.data)
          }).catch(error => {
            this.loading = false
            Promise.reject(error)
          })
          break;
        case 2:
          getStorageHalfgood(
            this.listQuery
          ).then(response => {
            this.handleRet(response.data.data)
          }).catch(error => {
            this.loading = false
            Promise.reject(error)
          })
          break;
        case 3:
          getStorageCommodity(
            this.listQuery
          ).then(response => {
            this.handleRet(response.data.data)
          }).catch(error => {
            this.loading = false
            Promise.reject(error)
          })
          break;
        case 4:
          getStorageStandard(
            this.listQuery
          ).then(response => {
            this.handleRet(response.data.data)
          }).catch(error => {
            this.loading = false
            Promise.reject(error)
          })
          break;
        default:
          break;
      }
    },
    handleRet(data) {
      this.total = data.total
      this.list = []
      if (data.list && data.list.length > 0) {
        data.list.forEach(v => {
          // 品类
          this.categoryList.forEach(c => {
            if (c.id === v.category) {
              v.categoryName = c.name
            }
          })
          // 属性
          let idx = 0
          v.attribute = ''
          this.templateList.forEach(t => {
            v.attribute = v.attribute + t + ': ' + v.attrs[idx++] + ', '
          })
          this.list.push(v)
          // 子账号
          if (v.sub && v.sub.length > 0) {
            v.saccount = v.sub.join('\n')
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
        id: this.userdata.user.id,
        atid: this.ctype
      }).then(response => {
        this.templateList = response.data.data.list
        this.getGroupAllStorage()
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      if (this.temp.mremark == null) {
        this.temp.mremark = ''
      }
      this.dialogVisible = true
    },
    updateData() {
      const data = {
        id: this.userdata.user.id,
        gid: this.userdata.group.id,
        sid: this.listQuery.sid,
        aid: this.listQuery.aid,
        asid: this.listQuery.asid,
        cid: this.temp.cid,
        code: this.temp.mcode,
        name: this.temp.mname,
        remark: this.temp.mremark,
        price: this.temp.alarm
      }
      /*if (this.ctype === 1) {
        setMarketCommodity(data).then(response => {
          this.$message({ type: 'success', message: '修改成功!' })
          this.getCommodityList()
          this.dialogVisible = false
        })
      } else {
        setMarketStandard(data).then(response => {
          this.$message({ type: 'success', message: '修改成功!' })
          this.getCommodityList()
          this.dialogVisible = false
        })
      }*/
    },
    handleDelete(row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        
      })
    }
  }
}
</script>
