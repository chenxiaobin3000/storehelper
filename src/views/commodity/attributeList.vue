<template>
  <div class="app-container">
    <el-row>
      <el-col :span="16">
        <el-form>
          <el-form-item label="标品属性模板">
            <el-button type="primary" size="mini" class="button-node" @click="handleUpdateTemp()">
              更新模板
            </el-button>
            <el-drag-select v-model="attrTempList4" class="select-node" multiple placeholder="请选择标品属性">
              <el-option v-for="item in attrOptions" :key="item.id" :label="item.label" :value="item.id" />
            </el-drag-select>
          </el-form-item>
          <el-form-item label="商品属性模板">
            <el-drag-select v-model="attrTempList1" class="select-node" multiple placeholder="请选择商品属性">
              <el-option v-for="item in attrOptions" :key="item.id" :label="item.label" :value="item.id" />
            </el-drag-select>
          </el-form-item>
          <el-form-item label="半成品属性模板">
            <el-drag-select v-model="attrTempList2" class="select-node" multiple placeholder="请选择半成品属性">
              <el-option v-for="item in attrOptions" :key="item.id" :label="item.label" :value="item.id" />
            </el-drag-select>
          </el-form-item>
          <el-form-item label="原料属性模板">
            <el-drag-select v-model="attrTempList3" class="select-node" multiple placeholder="请选择原料属性">
              <el-option v-for="item in attrOptions" :key="item.id" :label="item.label" :value="item.id" />
            </el-drag-select>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8">
        <el-form style="padding-left: 20px">
          <el-form-item label="属性列表">
            <el-table v-loading="loading" :data="attrList" style="width: 100%" border fit highlight-current-row>
              <el-table-column label="属性名称" width="140" align="center">
                <template slot-scope="{row}">
                  {{ row.name }}
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="{row}">
                  <el-button type="primary" size="small" @click="handleUpdate(row)">编辑</el-button>
                  <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogVisible">
      <el-form :model="temp" label-position="left" label-width="70px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="属性名称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ElDragSelect from '@/components/DragSelect'
import { mapState } from 'vuex'
import { getGroupAttr, addAttr, delAttr, setAttr, getGroupAttrTemp, updateAttrTemp } from '@/api/attribute'

export default {
  components: { ElDragSelect },
  data() {
    return {
      userdata: {},
      attrList: [],
      attrTempList1: [],
      attrTempList2: [],
      attrTempList3: [],
      attrTempList4: [],
      attrTempList5: [],
      attrOptions: [],
      loading: false,
      temp: {},
      dialogVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改属性',
        create: '新增属性'
      }
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
      this.searchword = newVal
      this.getGroupAttr()
    },
    create() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogVisible = true
    }
  },
  created() {
    this.userdata = this.$store.getters.userdata
    this.resetTemp()
    this.getGroupAttr()
  },
  methods: {
    resetTemp() {
      this.temp = {
        id: 0,
        name: ''
      }
    },
    getGroupAttr() {
      this.attrList = []
      this.attrOptions = []
      this.loading = true
      getGroupAttr({
        id: this.userdata.user.id
      }).then(response => {
        const list = response.data.data.list
        if (list && list.length > 0) {
          list.forEach(v => {
            this.attrList.push(v)
            this.attrOptions.push({ id: v.name, label: v.name })
          })
        }
        this.getGroupAttrTemp()
        this.loading = false
      }).catch(error => {
        this.loading = false
        Promise.reject(error)
      })
    },
    getGroupAttrTemp() {
      getGroupAttrTemp({
        id: this.userdata.user.id,
        atid: 0
      }).then(response => {
        this.attrTempList1 = response.data.data.list1
        this.attrTempList2 = response.data.data.list2
        this.attrTempList3 = response.data.data.list3
        this.attrTempList4 = response.data.data.list4
        this.attrTempList5 = response.data.data.list5
      })
    },
    createData() {
      addAttr({
        id: this.userdata.user.id,
        gid: this.userdata.group.id,
        name: this.temp.name
      }).then(response => {
        this.$message({ type: 'success', message: '新增成功!' })
        this.getGroupAttr()
        this.dialogVisible = false
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogVisible = true
    },
    updateData() {
      setAttr({
        id: this.userdata.user.id,
        aid: this.temp.id,
        gid: this.userdata.group.id,
        name: this.temp.name
      }).then(response => {
        this.$message({ type: 'success', message: '修改成功!' })
        this.getGroupAttr()
        this.dialogVisible = false
      })
    },
    handleDelete(row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delAttr({
          id: this.userdata.user.id,
          aid: row.id
        }).then(response => {
          this.$message({ type: 'success', message: '删除成功!' })
          this.getGroupAttr()
        })
      })
    },
    handleUpdateTemp() {
      updateAttrTemp({
        id: this.userdata.user.id,
        gid: this.userdata.group.id,
        template1: this.attrTempList1,
        template2: this.attrTempList2,
        template3: this.attrTempList3,
        template4: this.attrTempList4,
        template5: this.attrTempList5
      }).then(response => {
        this.$message({ type: 'success', message: '更新成功!' })
        this.getGroupAttr()
      })
    }
  }
}
</script>

<style>
.button-node {
  margin-top: 4px;
  float: right;
}

.select-node {
  margin-top: 4px;
  width: 100%;
}
</style>
