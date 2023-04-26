<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.sid" class="filter-item" @change="getStorageCommodityList">
        <el-option v-for="item in soptionsAll" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.aid" class="filter-item" @change="getAccountCommodityList">
        <el-option v-for="item in aoptionsAll" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.asid" class="filter-item" @change="getSubCommodityList">
        <el-option v-for="item in asoptionsAll" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
    </div>

    <el-table ref="table" v-loading="loading" :data="list" :height="tableHeight" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="编号" width="120px" align="center">
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
      <el-table-column label="属性" width="280px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.attribute }}</span>
        </template>
      </el-table-column>
      <el-table-column label="仓库" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.storageNames }} </span>
          <el-button icon="el-icon-edit" size="mini" circle @click="handleSelectStorage(row)" />
        </template>
      </el-table-column>
      <el-table-column label="账号" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.accountNames }} </span>
          <el-button icon="el-icon-edit" size="mini" circle @click="handleSelectAccount(row)" />
        </template>
      </el-table-column>
      <el-table-column label="原料" width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.oname }} </span>
          <el-button icon="el-icon-edit" size="mini" circle @click="handleSelectOriginal(row)" />
        </template>
      </el-table-column>
      <el-table-column label="备注" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="160" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" ref="pagination" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getCommodityList" />

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
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="设置关联原料" :visible.sync="dialogOriVisible">
      <el-form :model="tempOri" label-position="left" label-width="60px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="编号" prop="code">
          <span>{{ tempOri.code }}</span>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <span>{{ tempOri.name }}</span>
        </el-form-item>
        <el-form-item label="原料" prop="original">
          <el-input v-model="tempOri.ocode" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogOriVisible = false">取消</el-button>
        <el-button type="primary" @click="updateOriData()">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="设置关联仓库" :visible.sync="dialogStorageVisible">
      <el-form :model="tempStorage" label-position="left" label-width="60px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="编号" prop="code">
          <span>{{ tempStorage.code }}</span>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <span>{{ tempStorage.name }}</span>
        </el-form-item>
        <el-form-item label="仓库" prop="storage">
          <el-tree ref="tree" :check-strictly="checkStrictly" :data="routes" :props="defaultProps" show-checkbox node-key="path" class="permission-tree" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogStorageVisible = false">取消</el-button>
        <el-button type="primary" @click="updateStorageData()">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="设置关联账号" :visible.sync="dialogAccountVisible">
      <el-form :model="tempAccount" label-position="left" label-width="70px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="编号" prop="ccode">
          <span>{{ tempAccount.ccode }}</span>
        </el-form-item>
        <el-form-item label="名称" prop="cname">
          <span>{{ tempAccount.cname }}</span>
        </el-form-item>
        <el-form-item label="账号" prop="aid">
          <el-select v-model="tempAccount.aid" class="filter-item" @change="handleAidSelect">
            <el-option v-for="item in aoptions" :key="item.id" :label="item.label" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="子账号" prop="asid">
          <el-select v-model="tempAccount.asid" class="filter-item">
            <el-option v-for="item in asoptions" :key="item.id" :label="item.label" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="仓库" prop="sid">
          <el-select v-model="tempAccount.sid" class="filter-item">
            <el-option v-for="item in soptions" :key="item.id" :label="item.label" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="平台编号" prop="code">
          <el-input v-model="tempAccount.mcode" />
        </el-form-item>
        <el-form-item label="平台名称" prop="name">
          <el-input v-model="tempAccount.mname" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="tempAccount.mremark" />
        </el-form-item>
        <el-form-item label="预警" prop="alarm">
          <el-input v-model="tempAccount.alarm" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogStorageVisible = false">取消</el-button>
        <el-button type="primary" @click="updateStorageData()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination'
import { treeGenerate } from '@/utils/tree'
import { getGroupCommodity, addCommodity, setCommodity, delCommodity, setCommodityOriginal, getStorageCommodity, getAccountCommodity, setCommodityStorage } from '@/api/commodity'
import { getMarketAllAccount, getMarketSubAccount, getAccountStorage } from '@/api/dock'
import { getMarketCommodity, setMarketCommodity } from '@/api/market'
import { getGroupAllStorage } from '@/api/storage'
import { getGroupCategoryTree } from '@/api/category'
import { getGroupAttrTemp } from '@/api/attribute'

export default {
  components: { Pagination },
  data() {
    return {
      tableHeight: 0,
      userdata: {},
      soptionsAll: [], // 仅列表查询
      aoptionsAll: [], // 仅列表查询
      asoptionsAll: [], // 仅列表查询
      soptions: [], // 仅对话框使用
      aoptions: [], // 仅对话框使用
      asoptions: [], // 仅对话框使用
      routes: [],
      data: [],
      list: null,
      total: 0,
      categoryList: [],
      templateList: {},
      storageList: [],
      loading: false,
      listQuery: {
        id: 0,
        gid: 0,
        sid: 0, // 仅列表查询
        aid: 0, // 仅列表查询
        asid: 0, // 仅列表查询
        page: 1,
        limit: 10,
        search: null
      },
      temp: {},
      tempOri: {},
      tempStorage: {},
      tempAccount: {
        id: 0,
        aid: 0, // 仅对话框使用
        asid: 0, // 仅对话框使用
        sid: 0, // 仅对话框使用
        storages: null,
        ccode: '',
        cname: '',
        mcode: '',
        mname: '',
        mremark: '',
        alarm: 0
      },
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      dialogVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改商品信息',
        create: '新增商品'
      },
      dialogOriVisible: false,
      dialogStorageVisible: false,
      dialogAccountVisible: false
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
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogVisible = true
    }
  },
  mounted: function() {
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 78
    }, 2000)
  },
  created() {
    this.userdata = this.$store.getters.userdata
    this.listQuery.id = this.userdata.user.id
    this.listQuery.gid = this.userdata.group.id
    this.resetTemp()
    this.getMarketAllAccount()
    this.getGroupAllStorage()
    this.getCategoryList()
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
    getStorageCommodityList() {
      this.listQuery.aid = 0
      this.listQuery.asid = 0
      this.listQuery.page = 1
      this.listQuery.limit = 10
      this.asoptionsAll = [{ id: 0, label: '无' }]
      this.getCommodityList()
    },
    getAccountCommodityList() {
      this.listQuery.sid = 0
      this.listQuery.page = 1
      this.listQuery.limit = 10
      if (this.listQuery.aid !== 0) {
        getMarketSubAccount({
          id: this.listQuery.id,
          gid: this.listQuery.gid,
          aid: this.listQuery.aid
        }).then(response => {
          const list = response.data.data.list
          if (list.length > 0) {
            this.asoptionsAll = []
            list.forEach(v => {
              this.asoptionsAll.push({ id: v.id, label: v.account })
            })
            this.listQuery.asid = this.asoptionsAll[0].id
          } else {
            this.asoptionsAll = [{ id: 0, label: '无' }]
            this.listQuery.asid = 0
          }
        })
      }
      this.getCommodityList()
    },
    getSubCommodityList() {
      this.listQuery.sid = 0
      this.listQuery.page = 1
      this.listQuery.limit = 10
      this.getCommodityList()
    },
    getCommodityList() {
      this.loading = true
      this.list = []
      if (this.listQuery.sid !== 0) {
        this.getStorageCommodity()
      } else if (this.listQuery.aid !== 0) {
        this.getAccountCommodity()
      } else if (this.listQuery.asid !== 0) {
        this.getAccountCommodity()
      } else {
        getGroupCommodity(
          this.listQuery
        ).then(response => {
          this.total = response.data.data.total
          const list = response.data.data.list
          if (list && list.length > 0) {
            this.handleRet(list)
          }
          this.loading = false
        }).catch(error => {
          this.loading = false
          Promise.reject(error)
        })
      }
    },
    getStorageCommodity() {
      getStorageCommodity(
        this.listQuery
      ).then(response => {
        this.total = response.data.data.total
        const list = response.data.data.list
        if (list && list.length > 0) {
          this.handleRet(list)
        }
        this.loading = false
      }).catch(error => {
        this.loading = false
        Promise.reject(error)
      })
    },
    getAccountCommodity() {
      getAccountCommodity(
        this.listQuery
      ).then(response => {
        this.total = response.data.data.total
        const list = response.data.data.list
        if (list && list.length > 0) {
          this.handleRet(list)
        }
        this.loading = false
      }).catch(error => {
        this.loading = false
        Promise.reject(error)
      })
    },
    handleRet(list) {
      list.forEach(v => {
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
          v.attribute = v.attribute + t + ': ' + (v.attrs[idx] ? v.attrs[idx++] : '') + ', '
        })

        // 账号
        v.accountNames = ''
        if (v.accounts && v.accounts.length > 0) {
          v.accounts.forEach(c => {
            v.accountNames = v.accountNames + c + ', '
          })
        }
        this.list.push(v)
      })
    },
    getMarketAllAccount() {
      getMarketAllAccount({
        id: this.listQuery.id,
        gid: this.listQuery.gid
      }).then(response => {
        this.aoptionsAll = [{ id: 0, label: '全部账号' }]
        this.asoptionsAll = [{ id: 0, label: '无' }]
        const list = response.data.data.list
        if (list.length > 0) {
          list.forEach(v => {
            const data = { id: v.id, label: v.account }
            this.aoptionsAll.push(data)
            this.aoptions.push(data)
          })
          this.tempAccount.aid = this.aoptions[0].id
        }
      })
    },
    getGroupAllStorage() {
      getGroupAllStorage({
        id: this.userdata.user.id
      }).then(response => {
        this.soptionsAll = [{ id: 0, label: '全部仓库' }]
        response.data.data.list.forEach(v => {
          this.soptionsAll.push({ id: v.id, label: v.name })
          this.data.push({ path: '/' + v.id, meta: { title: v.name, roles: [v.id] }})
        })
        this.routes = treeGenerate.generateRoutes(this.data)
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
        id: this.userdata.user.id
      }).then(response => {
        this.templateList = response.data.data.list
        this.getCommodityList()
      })
    },
    createData() {
      addCommodity({
        id: this.listQuery.id,
        gid: this.listQuery.gid,
        code: this.temp.code,
        name: this.temp.name,
        cid: this.temp.category,
        remark: this.temp.remark,
        attrs: this.temp.attributes
      }).then(response => {
        this.$message({ type: 'success', message: '新增成功!' })
        this.getCommodityList()
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
      console.log(this.templateList)
      this.templateList.forEach(v => {
        this.temp.attributes.push(row.attrs[idx++])
        this.temp.holders.push(v)
      })
      this.dialogStatus = 'update'
      this.dialogVisible = true
    },
    updateData() {
      setCommodity({
        id: this.listQuery.id,
        gid: this.listQuery.gid,
        commid: this.temp.id,
        code: this.temp.code,
        name: this.temp.name,
        cid: this.temp.category,
        remark: this.temp.remark,
        attrs: this.temp.attributes
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
        delCommodity({
          id: this.userdata.user.id,
          cid: row.id
        }).then(response => {
          this.$message({ type: 'success', message: '删除成功!' })
          this.getCommodityList()
        })
      })
    },
    handleSelectOriginal(row) {
      this.tempOri = {
        id: row.id,
        code: row.code,
        name: row.name,
        oname: row.oname,
        ocode: row.ocode
      }
      this.dialogOriVisible = true
    },
    updateOriData() {
      setCommodityOriginal({
        id: this.listQuery.id,
        gid: this.listQuery.gid,
        cid: this.tempOri.id,
        oid: this.tempOri.ocode
      }).then(response => {
        this.$message({ type: 'success', message: '修改成功!' })
        this.getCommodityList()
        this.dialogOriVisible = false
      })
    },
    handleSelectStorage(row) {
      this.tempStorage = {
        id: row.id,
        code: row.code,
        name: row.name
      }
      // 仓库列表
      this.tempStorage.routes = row.storages
      this.checkStrictly = true // 保护父子节点不相互影响
      this.$nextTick(() => {
        const routes = treeGenerate.filterAsyncRoutes(this.data, this.tempStorage.routes)
        this.$refs.tree.setCheckedNodes(treeGenerate.generateArr(routes))
        this.checkStrictly = false
      })
      this.dialogStorageVisible = true
    },
    updateStorageData() {
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      this.tempStorage.routes = treeGenerate.generateTree(this.data, '/', checkedKeys)
      setCommodityStorage({
        id: this.listQuery.id,
        gid: this.listQuery.gid,
        cid: this.tempStorage.id,
        sids: this.tempStorage.routes
      }).then(response => {
        this.$message({ type: 'success', message: '修改成功!' })
        this.getCommodityList()
        this.dialogStorageVisible = false
      })
    },
    getMarketSubAccount() {
      getMarketSubAccount({
        id: this.listQuery.id,
        gid: this.listQuery.gid,
        aid: this.tempAccount.aid
      }).then(response => {
        const list = response.data.data.list
        if (list.length > 0) {
          this.asoptions = []
          list.forEach(v => {
            this.asoptions.push({ id: v.id, label: v.account })
          })
          this.tempAccount.asid = this.asoptions[0].id
        } else {
          this.asoptions = [{ id: 0, label: '无' }]
          this.tempAccount.asid = 0
        }
      })
    },
    handleAidSelect() {
      getAccountStorage({
        id: this.listQuery.id,
        gid: this.listQuery.gid,
        aid: this.tempAccount.aid
      }).then(response => {
        const list = response.data.data.list
        if (list.length > 0) {
          this.soptions = []
          list.forEach(v => {
            this.soptions.push({ id: v.id, label: v.name })
          })
          this.tempAccount.sid = this.soptions[0].id
          getMarketCommodity({
            id: this.listQuery.id,
            gid: this.listQuery.gid,
            sid: this.tempAccount.sid,
            aid: this.tempAccount.aid,
            asid: this.tempAccount.asid,
            cid: this.tempAccount.id
          }).then(response => {
            const commodity = response.data.data.commodity
            if (commodity) {
              this.tempAccount.mcode = commodity.code
              this.tempAccount.mname = commodity.name
              this.tempAccount.mremark = commodity.remark
              this.tempAccount.alarm = commodity.price
            }
          })
        } else {
          this.soptions = [{ id: 0, label: '无' }]
          this.tempAccount.sid = 0
        }
      })
      this.getMarketSubAccount()
    },
    handleSelectAccount(row) {
      this.tempAccount.id = row.id
      this.tempAccount.storages = row.storages
      this.tempAccount.ccode = row.code
      this.tempAccount.cname = row.name
      this.tempAccount.cremark = row.remark
      this.tempAccount.mcode = ''
      this.tempAccount.mname = ''
      this.tempAccount.mremark = ''
      this.tempAccount.alarm = ''
      this.handleAidSelect()
      this.dialogAccountVisible = true
    },
    updateAccountData() {
      // 上架商品
      setMarketCommodity({
        id: this.listQuery.id,
        gid: this.listQuery.gid,
        sid: this.tempAccount.sid,
        aid: this.tempAccount.aid,
        asid: this.tempAccount.asid,
        cid: this.tempAccount.id,
        code: this.tempAccount.mcode,
        name: this.tempAccount.mname,
        remark: this.tempAccount.mremark == null ? '' : this.tempAccount.mremark,
        price: this.tempAccount.alarm
      }).then(response => {
        this.$message({ type: 'success', message: '更新成功!' })

        // 绑定仓库
        if (!this.tempAccount.storages.includes(this.tempAccount.sid)) {
          this.tempAccount.storages.push(this.tempAccount.sid)
          setCommodityStorage({
            id: this.listQuery.id,
            gid: this.listQuery.gid,
            cid: this.tempStorage.id,
            sids: this.tempAccount.storages
          })
        }
      })
    }
  }
}
</script>
