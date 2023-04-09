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
      <el-table-column label="品类" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.categoryName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="属性" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.attribute }}</span>
        </template>
      </el-table-column>
      <el-table-column label="云仓" align="center">
        <template slot-scope="{row}">
          <span>{{ row.cloudNames }}</span>
        </template>
      </el-table-column>
      <el-table-column label="仓库" align="center">
        <template slot-scope="{row}">
          <span>{{ row.storageNames }} </span>
          <el-button icon="el-icon-edit" size="mini" circle @click="handleSelectStorage(row)" />
        </template>
      </el-table-column>
      <el-table-column label="备注" width="160px" align="center">
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

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getStandardList" />

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

    <el-dialog title="设置关联云仓/仓库" :visible.sync="dialogStorageVisible">
      <el-form :model="tempStorage" label-position="left" label-width="60px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="编号" prop="code">
          <span>{{ tempStorage.code }}</span>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <span>{{ tempStorage.name }}</span>
        </el-form-item>
        <el-form-item label="云仓" prop="cloud">
          <el-tree ref="treeC" :check-strictly="checkStrictlyC" :data="routesC" :props="defaultProps" show-checkbox node-key="path" class="permission-tree" />
        </el-form-item>
        <el-form-item label="仓库" prop="storage">
          <el-tree ref="treeS" :check-strictly="checkStrictlyS" :data="routesS" :props="defaultProps" show-checkbox node-key="path" class="permission-tree" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogStorageVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateStorageData()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination'
import { treeGenerate } from '@/utils/tree'
import { getGroupStandard, addStandard, setStandard, delStandard, setStandardCloud, setStandardStorage } from '@/api/standard'
import { getGroupAllStorage } from '@/api/storage'
import { getGroupCategoryTree } from '@/api/category'
import { getGroupAttrTemp } from '@/api/attribute'

export default {
  components: { Pagination },
  data() {
    return {
      userdata: {},
      routesC: [],
      routesS: [],
      dataC: [],
      dataS: [],
      list: null,
      total: 0,
      categoryList: [],
      templateList: {},
      cloudList: [],
      storageList: [],
      loading: false,
      listQuery: {
        id: 0,
        page: 1,
        limit: 20,
        search: null
      },
      temp: {},
      tempStorage: {},
      checkStrictlyC: false,
      checkStrictlyS: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      dialogVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改标品信息',
        create: '新增标品'
      },
      dialogStorageVisible: false
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
      this.getStandardList()
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
    this.getGroupAllStorage()
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
        remark: ''
      }
      if (this.templateList && this.templateList.length > 0) {
        this.templateList.forEach(v => {
          this.temp.attributes.push('')
          this.temp.holders.push(v)
        })
      }
    },
    getStandardList() {
      this.loading = true
      getGroupStandard(
        this.listQuery
      ).then(response => {
        this.total = response.data.data.total
        this.list = []
        if (response.data.data.list && response.data.data.list.length > 0) {
          response.data.data.list.forEach(v => {
            if (v.clouds && v.clouds.length > 0) {
              const tmp = []
              v.cloudNames = ''
              v.clouds.forEach(s => {
                tmp.push(s.sid)
                v.cloudNames = v.cloudNames + s.name + ', '
              })
              v.clouds = tmp
            } else {
              v.clouds = []
            }
            if (v.storages && v.storages.length > 0) {
              const tmp = []
              v.storageNames = ''
              v.storages.forEach(s => {
                tmp.push(s.sid)
                v.storageNames = v.storageNames + s.name + ', '
              })
              v.storages = tmp
            } else {
              v.storages = []
            }

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
    getGroupAllStorage() {
      getGroupAllStorage({
        id: this.userdata.user.id
      }).then(response => {
        response.data.data.list.forEach(v => {
          this.dataS.push({ path: '/' + v.id, meta: { title: v.name, roles: [v.id] }})
        })
        this.routesS = treeGenerate.generateRoutes(this.dataS)
        this.getCategoryList()
      })
    },
    getCategoryList() {
      getGroupCategoryTree({
        id: this.userdata.user.id
      }).then(response => {
        this.generator(response.data.data.list)
        this.getGroupAttrTemp()
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
        atid: 4
      }).then(response => {
        this.templateList = response.data.data.list
        this.getStandardList()
      })
    },
    createData() {
      addStandard({
        id: this.userdata.user.id,
        gid: this.userdata.group.id,
        code: this.temp.code,
        name: this.temp.name,
        cid: this.temp.category,
        remark: this.temp.remark,
        attrs: this.temp.attributes
      }).then(response => {
        this.$message({ type: 'success', message: '新增成功!' })
        this.getStandardList()
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
      setStandard({
        id: this.userdata.user.id,
        sid: this.temp.id,
        gid: this.userdata.group.id,
        code: this.temp.code,
        name: this.temp.name,
        cid: this.temp.category,
        remark: this.temp.remark,
        attrs: this.temp.attributes
      }).then(response => {
        this.$message({ type: 'success', message: '修改成功!' })
        this.getStandardList()
        this.dialogVisible = false
      })
    },
    handleDelete(row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delStandard({
          id: this.userdata.user.id,
          sid: row.id
        }).then(response => {
          this.$message({ type: 'success', message: '删除成功!' })
          this.getStandardList()
        })
      })
    },
    handleSelectStorage(row) {
      this.tempStorage = {
        id: row.id,
        code: row.code,
        name: row.name
      }
      // 云仓列表
      this.tempStorage.routesC = row.clouds
      this.checkStrictlyC = true // 保护父子节点不相互影响
      this.$nextTick(() => {
        const routes = treeGenerate.filterAsyncRoutes(this.dataC, this.tempStorage.routesC)
        this.$refs.treeC.setCheckedNodes(treeGenerate.generateArr(routes))
        this.checkStrictlyC = false
      })
      // 仓库列表
      this.tempStorage.routesS = row.storages
      this.checkStrictlyS = true // 保护父子节点不相互影响
      this.$nextTick(() => {
        const routes = treeGenerate.filterAsyncRoutes(this.dataS, this.tempStorage.routesS)
        this.$refs.treeS.setCheckedNodes(treeGenerate.generateArr(routes))
        this.checkStrictlyS = false
      })
      this.dialogStorageVisible = true
    },
    updateStorageData() {
      const checkedKeys = this.$refs.treeC.getCheckedKeys()
      this.tempStorage.routesC = treeGenerate.generateTree(this.dataC, '/', checkedKeys)

      setStandardCloud({
        id: this.userdata.user.id,
        gid: this.userdata.group.id,
        cid: this.tempStorage.id,
        sids: this.tempStorage.routesC
      }).then(response => {
        const checkedKeys = this.$refs.treeS.getCheckedKeys()
        this.tempStorage.routesS = treeGenerate.generateTree(this.dataS, '/', checkedKeys)

        setStandardStorage({
          id: this.userdata.user.id,
          gid: this.userdata.group.id,
          cid: this.tempStorage.id,
          sids: this.tempStorage.routesS
        }).then(response => {
          this.$message({ type: 'success', message: '修改成功!' })
          this.getStandardList()
          this.dialogStorageVisible = false
        })
      })
    }
  }
}
</script>
