<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.sid" class="filter-item" @change="getStorageCommodityList">
        <el-option v-for="item in storages" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.aid" class="filter-item" @change="getAccountCommodityList">
        <el-option v-for="item in aoptionsAll" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <el-button type="primary" size="normal" style="float:right;width:100px;margin-left:20px" @click="handleExcel()">批量导入</el-button>
      <el-button type="primary" size="normal" style="float:right;width:100px" @click="handleDownload()">模板下载</el-button>
    </div>

    <el-table ref="table" v-loading="loading" :data="list" :height="tableHeight" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="编号" fixed="left" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" fixed="left" width="240px" align="center">
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
      <el-table-column label="操作" align="center" fixed="right" width="160" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getCommodityList" />

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
        <el-form-item label="编号" prop="code">
          <span>{{ tempAccount.code }}</span>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <span>{{ tempAccount.name }}</span>
        </el-form-item>
        <el-form-item label="账号" prop="aid">
          <el-select v-model="listQuery.aid" class="filter-item" @change="handleAidSelect">
            <el-option v-for="item in aoptions" :key="item.id" :label="item.label" :value="item.id" />
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
        <el-button type="danger" @click="delAccountData()">删除</el-button>
        <el-button type="primary" @click="updateAccountData()">设置</el-button>
      </div>
    </el-dialog>

    <el-dialog title="导入Excel" :visible.sync="dialogExcelVisible">
      <upload-excel-component :on-success="handleSuccess" width="90%" line-height="290px" height="300px" />
      <br>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination'
import UploadExcelComponent from '@/components/UploadExcel'
import { treeGenerate } from '@/utils/tree'
import { getGroupCommodity, addCommodityList, addCommodity, setCommodity, delCommodity, setCommodityOriginal, getStorageCommodity, setCommodityStorage } from '@/api/commodity'
import { getMarketAllAccount, getMarketCommodity, setMarketCommodity, delMarketCommodity, getMarketCommodityList } from '@/api/market'
import { getGroupAllStorage } from '@/api/storage'
import { getGroupCategoryTree } from '@/api/category'
import { getGroupAttrTemp } from '@/api/attribute'

export default {
  components: { Pagination, UploadExcelComponent },
  data() {
    return {
      tableHeight: 600,
      userdata: {},
      storages: [],
      aoptionsAll: [], // 仅列表查询
      aoptions: [], // 仅对话框使用
      routes: [],
      data: [],
      list: null,
      total: 0,
      categoryList: [],
      templateList: {},
      loading: false,
      listQuery: {
        id: 0,
        gid: 0,
        sid: 0,
        aid: 0,
        page: 1,
        limit: 10,
        search: null
      },
      temp: {},
      tempOri: {},
      tempStorage: {},
      tempAccount: {
        id: 0,
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
      dialogAccountVisible: false,
      dialogExcelVisible: false
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
    }, 1000)
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
    handleSuccess({ results, header }) {
      const codes = []
      const names = []
      const cids = []
      const remarks = []
      const storages = []
      const attr1 = []
      const attr2 = []
      const attr3 = []
      const attr4 = []
      const attr5 = []
      const attr6 = []
      const attr7 = []
      const attr8 = []
      const idName = '编号'
      const commName = '商品名称'
      const cName = '品类'
      const remarkName = '备注'
      const storageName = '仓库'
      const attrName = '属性'
      let attrNum = 8

      // 计算属性数量
      const tmp = results[0]
      for (let i = 2; i < 9; i++) {
        if (tmp[attrName + i] && tmp[attrName + i].length > 0) {
          continue
        }
        attrNum = i - 1
        break
      }

      results.forEach(v => {
        let code = v[idName]
        if (code && Number.isFinite(code)) {
          code = '' + code
        }
        if (code && code.length > 0) {
          codes.push(code)
          names.push(v[commName])

          // 品类
          const cateName = v[cName]
          this.categoryList.forEach(c => {
            if (cateName === c.label) {
              cids.push(c.id)
            }
          })

          // 仓库
          const sids = []
          for (let i = 1; i < 9; i++) {
            let find = false
            const sName = v[storageName + i]
            this.storages.forEach(s => {
              if (sName === s.label) {
                sids.push(s.id)
                find = true
              }
            })
            if (!find) {
              break
            }
          }

          remarks.push(v[remarkName])
          storages.push(sids.join(','))
          attr1.push(v[attrName + 1])
          if (attrNum > 1) {
            attr2.push(v[attrName + 2])
          }
          if (attrNum > 2) {
            attr3.push(v[attrName + 3])
          }
          if (attrNum > 3) {
            attr4.push(v[attrName + 4])
          }
          if (attrNum > 4) {
            attr5.push(v[attrName + 5])
          }
          if (attrNum > 5) {
            attr6.push(v[attrName + 6])
          }
          if (attrNum > 6) {
            attr7.push(v[attrName + 7])
          }
          if (attrNum > 7) {
            attr8.push(v[attrName + 8])
          }
        }
      })

      addCommodityList({
        id: this.listQuery.id,
        gid: this.listQuery.gid,
        codes: codes,
        names: names,
        cids: cids,
        remarks: remarks,
        storages: storages,
        attr: attrNum,
        attr1: attr1,
        attr2: attr2,
        attr3: attr3,
        attr4: attr4,
        attr5: attr5,
        attr6: attr6,
        attr7: attr7,
        attr8: attr8
      }).then(response => {
        this.$message({ type: 'success', message: '更新成功!' })
        this.getStockList()
        this.dialogExcelVisible = false
      })
    },
    getStorageCommodityList() {
      this.listQuery.aid = 0
      this.listQuery.page = 1
      this.listQuery.limit = 10
      this.getCommodityList()
    },
    getAccountCommodityList() {
      this.listQuery.sid = 0
      this.listQuery.page = 1
      this.listQuery.limit = 10
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
        this.getMarketCommodityList()
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
    getMarketCommodityList() {
      getMarketCommodityList(
        this.listQuery
      ).then(response => {
        this.total = response.data.data.total
        const list = response.data.data.list
        if (list && list.length > 0) {
          list.forEach(v => {
            v.id = v.cid
            v.code = v.ccode
            v.name = v.cname
            v.cid = v.cate
          })
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
        const list = response.data.data.list
        if (list.length > 0) {
          list.forEach(v => {
            const data = { id: v.id, label: v.account }
            this.aoptionsAll.push(data)
            this.aoptions.push(data)
          })
        }
      })
    },
    getGroupAllStorage() {
      getGroupAllStorage({
        id: this.userdata.user.id
      }).then(response => {
        this.storages = [{ id: 0, label: '全部仓库' }]
        response.data.data.list.forEach(v => {
          this.storages.push({ id: v.id, label: v.name })
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
    handleAidSelect() {
      getMarketCommodity({
        id: this.listQuery.id,
        gid: this.listQuery.gid,
        aid: this.listQuery.aid,
        cid: this.tempAccount.id
      }).then(response => {
        const commodity = response.data.data.commodity
        if (commodity) {
          this.tempAccount.mcode = commodity.code
          this.tempAccount.mname = commodity.name
          this.tempAccount.mremark = commodity.remark
          this.tempAccount.alarm = commodity.price
        } else {
          this.tempAccount.mcode = ''
          this.tempAccount.mname = ''
          this.tempAccount.mremark = ''
          this.tempAccount.alarm = ''
        }
      })
    },
    handleSelectAccount(row) {
      this.tempAccount = Object.assign({}, row)
      if (this.listQuery.aid === 0) {
        this.listQuery.aid = this.aoptions[0].id
      }
      this.dialogAccountVisible = true
    },
    updateAccountData() {
      // 上架商品
      setMarketCommodity({
        id: this.listQuery.id,
        gid: this.listQuery.gid,
        aid: this.listQuery.aid,
        cid: this.tempAccount.id,
        code: this.tempAccount.mcode,
        name: this.tempAccount.mname,
        remark: this.tempAccount.mremark == null ? '' : this.tempAccount.mremark,
        price: this.tempAccount.alarm
      }).then(response => {
        this.$message({ type: 'success', message: '更新成功!' })
        this.getCommodityList()
      })
    },
    delAccountData() {
      delMarketCommodity({
        id: this.listQuery.id,
        gid: this.listQuery.gid,
        aid: this.listQuery.aid,
        cid: this.tempAccount.id
      }).then(response => {
        this.$message({ type: 'success', message: '删除成功!' })
        this.tempAccount.mcode = ''
        this.tempAccount.mname = ''
        this.tempAccount.mremark = ''
        this.tempAccount.alarm = ''
        this.getCommodityList()
      })
    },
    handleDownload() {
      const atag = document.createElement('a')
      atag.href = 'http://' + process.env.VUE_APP_BASE_API
      atag.href = atag.href.substring(0, atag.href.length - 4) + '商品模板.xlsx'
      atag.click()
    },
    handleExcel() {
      this.dialogExcelVisible = true
    }
  }
}
</script>
