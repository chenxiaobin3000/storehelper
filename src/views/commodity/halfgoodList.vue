<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="list" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="编号" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="原料" width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.oname }} </span>
          <el-button @click="handleSelectOriginal(row)">
            修改
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="品类" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.categoryName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="属性" width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.attribute }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单位" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.unit }}克</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" width="110px" align="center">
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

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getHalfgoodList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogVisible">
      <el-form :model="temp" label-position="left" label-width="60px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="编号" prop="code">
          <el-input v-model="temp.code" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="品类" prop="category">
          <el-select v-model="temp.category" class="filter-item" placeholder="请选择品类">
            <el-option v-for="item in categoryList" :key="item.id" :label="item.label" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="temp.attributes && temp.attributes.length > 0" label="属性" prop="attribute1">
          <el-input v-if="temp.attributes && temp.attributes.length > 0" v-model="temp.attributes[0]" style="width: 49%" :placeholder="temp.holders[0]" />
          <el-input v-if="temp.attributes && temp.attributes.length > 1" v-model="temp.attributes[1]" style="width: 49%; margin-left: 2%;" :placeholder="temp.holders[1]" />
        </el-form-item>
        <el-form-item v-if="temp.attributes && temp.attributes.length > 2" label="" prop="attribute2">
          <el-input v-if="temp.attributes && temp.attributes.length > 2" v-model="temp.attributes[2]" style="width: 49%" :placeholder="temp.holders[2]" />
          <el-input v-if="temp.attributes && temp.attributes.length > 3" v-model="temp.attributes[3]" style="width: 49%; margin-left: 2%;" :placeholder="temp.holders[3]" />
        </el-form-item>
        <el-form-item v-if="temp.attributes && temp.attributes.length > 4" label="" prop="attribute3">
          <el-input v-if="temp.attributes && temp.attributes.length > 4" v-model="temp.attributes[4]" style="width: 49%" :placeholder="temp.holders[4]" />
          <el-input v-if="temp.attributes && temp.attributes.length > 5" v-model="temp.attributes[5]" style="width: 49%; margin-left: 2%;" :placeholder="temp.holders[5]" />
        </el-form-item>
        <el-form-item v-if="temp.attributes && temp.attributes.length > 6" label="" prop="attribute4">
          <el-input v-if="temp.attributes && temp.attributes.length > 6" v-model="temp.attributes[6]" style="width: 49%" :placeholder="temp.holders[6]" />
          <el-input v-if="temp.attributes && temp.attributes.length > 7" v-model="temp.attributes[7]" style="width: 49%; margin-left: 2%;" :placeholder="temp.holders[7]" />
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input-number v-model="temp.price" :precision="2" />
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input-number v-model="temp.unit" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="temp.remark" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="设置关联原料" :visible.sync="dialogOriVisible">
      <el-form :model="tempOri" label-position="left" label-width="60px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="编号" prop="code">
          <el-input v-model="tempOri.code" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="tempOri.name" />
        </el-form-item>
        <el-form-item label="原料" prop="original">
          <el-select v-model="tempOri.oid" class="filter-item" placeholder="请选择原料">
            <el-option v-for="item in originalList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogOriVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateOriData()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination'
import { getGroupHalfgood, addHalfgood, setHalfgood, delHalfgood, setHalfgoodOriginal } from '@/api/halfgood'
import { getGroupAllOriginal } from '@/api/original'
import { getGroupCategory } from '@/api/category'
import { getGroupAttrTemp } from '@/api/attribute'

export default {
  components: { Pagination },
  data() {
    return {
      userdata: {},
      list: null,
      total: 0,
      categoryList: [],
      templateList: {},
      originalList: {},
      loading: false,
      listQuery: {
        id: 0,
        page: 1,
        limit: 20,
        search: null
      },
      temp: {},
      tempOri: {},
      dialogVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改半成品信息',
        create: '新增半成品'
      },
      dialogOriVisible: false
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
      this.getHalfgoodList()
    },
    create() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogVisible = true
    }
  },
  created() {
    this.userdata = this.$store.getters.userdata
    this.listQuery.id = this.userdata.user.id
    this.resetTemp()
    this.getCategoryList()
    this.getGroupAttrTemp()
    this.getHalfgoodList()
    this.getOriginalList()
  },
  methods: {
    resetTemp() {
      this.temp = {
        id: 0,
        code: '',
        name: '',
        category: null,
        attributes: [],
        holders: [],
        price: 0,
        unit: 0,
        remark: ''
      }
      if (this.templateList && this.templateList.length > 0) {
        this.templateList.forEach(v => {
          this.temp.attributes.push('')
          this.temp.holders.push(v)
        })
      }
    },
    getHalfgoodList() {
      this.loading = true
      getGroupHalfgood(
        this.listQuery
      ).then(response => {
        this.total = response.data.data.total
        this.list = []
        if (response.data.data.list && response.data.data.list.length > 0) {
          response.data.data.list.forEach(v => {
            // 品类
            this.categoryList.forEach(c => {
              if (c.id === v.cid) {
                v.category = c.id
                v.categoryName = c.label
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
    getOriginalList() {
      this.loading = true
      getGroupAllOriginal({
        id: this.userdata.user.id
      }).then(response => {
        this.originalList = response.data.data.list
        this.loading = false
      }).catch(error => {
        this.loading = false
        Promise.reject(error)
      })
    },
    getCategoryList() {
      getGroupCategory({
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
        atid: 2
      }).then(response => {
        this.templateList = response.data.data.list
      })
    },
    createData() {
      addHalfgood({
        id: this.userdata.user.id,
        gid: this.userdata.group.id,
        code: this.temp.code,
        name: this.temp.name,
        cid: this.temp.category,
        price: this.temp.price,
        unit: this.temp.unit,
        remark: this.temp.remark,
        attrs: this.temp.attributes
      }).then(response => {
        this.$message({ type: 'success', message: '新增成功!' })
        this.getHalfgoodList()
        this.dialogVisible = false
      })
    },
    handleUpdate(row) {
      this.temp = {
        id: row.id,
        code: row.code,
        name: row.name,
        category: row.category,
        attributes: [],
        holders: [],
        price: row.price,
        unit: row.unit,
        remark: row.remark
      }
      let idx = 0
      this.templateList.forEach(v => {
        this.temp.attributes.push(row.attrs[idx++])
        this.temp.holders.push(v)
      })
      this.dialogStatus = 'update'
      this.dialogVisible = true
    },
    updateData() {
      setHalfgood({
        id: this.userdata.user.id,
        hid: this.temp.id,
        gid: this.userdata.group.id,
        code: this.temp.code,
        name: this.temp.name,
        cid: this.temp.category,
        price: this.temp.price,
        unit: this.temp.unit,
        remark: this.temp.remark,
        attrs: this.temp.attributes
      }).then(response => {
        this.$message({ type: 'success', message: '修改成功!' })
        this.getHalfgoodList()
        this.dialogVisible = false
      })
    },
    handleDelete(row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delHalfgood({
          id: this.userdata.user.id,
          hid: row.id
        }).then(response => {
          this.$message({ type: 'success', message: '删除成功!' })
          this.getHalfgoodList()
        })
      })
    },
    handleSelectOriginal(row) {
      this.tempOri = {
        id: row.id,
        code: row.code,
        name: row.name,
        oid: row.oid,
        oname: row.oname
      }
      this.dialogOriVisible = true
    },
    updateOriData() {
      setHalfgoodOriginal({
        id: this.userdata.user.id,
        gid: this.userdata.group.id,
        hid: this.tempOri.id,
        oid: this.tempOri.oid
      }).then(response => {
        this.$message({ type: 'success', message: '修改成功!' })
        this.getHalfgoodList()
        this.dialogOriVisible = false
      })
    }
  }
}
</script>
