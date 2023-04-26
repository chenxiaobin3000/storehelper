<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="list" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="仓库名称" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地区" width="180px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.areaName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系人" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.contact }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" align="center">
        <template slot-scope="{row}">
          <span>{{ row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getGroupStorage" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogVisible">
      <el-form :model="temp" label-position="left" label-width="70px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="名称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="联系人" prop="contact">
          <el-input v-model="temp.contact" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="temp.phone" />
        </el-form-item>
        <el-form-item label="地区" prop="code">
          <el-cascader v-model="temp.region" size="large" style="width: 80%;" :options="regionOptions" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="temp.address" />
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { regionData, CodeToText } from 'element-china-area-data'
import Pagination from '@/components/Pagination'
import { getGroupStorage, addStorage, setStorage, delStorage } from '@/api/storage'

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
        page: 1,
        limit: 10,
        search: null
      },
      temp: {},
      regionOptions: regionData,
      dialogVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改仓库信息',
        create: '新增仓库'
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
      this.listQuery.search = newVal
      this.getGroupStorage()
    },
    create() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogVisible = true
    }
  },
  created() {
    this.listQuery.id = this.$store.getters.userdata.user.id
    this.userdata = this.$store.getters.userdata
    this.resetTemp()
    this.getGroupStorage()
  },
  methods: {
    resetTemp() {
      this.temp = {
        id: 0,
        name: '',
        region: [],
        contact: '',
        phone: '',
        address: '',
        remark: ''
      }
    },
    getGroupStorage() {
      this.loading = true
      getGroupStorage(
        this.listQuery
      ).then(response => {
        this.total = response.data.data.total
        this.list = response.data.data.list
        // 处理地区码
        this.list.forEach(v => {
          const temp = []
          temp.push(v.area.slice(0, 6))
          temp.push(v.area.slice(6, 12))
          temp.push(v.area.slice(12, 18))
          v.areaName = CodeToText[temp[0]] + '/' + CodeToText[temp[1]] + '/' + CodeToText[temp[2]]
        })
        this.loading = false
      }).catch(error => {
        this.loading = false
        Promise.reject(error)
      })
    },
    createData() {
      if (!this.temp.region || this.temp.region.length <= 0) {
        this.$message({ type: 'error', message: '请选择仓库地区' })
        return
      }
      addStorage({
        id: this.listQuery.id,
        gid: this.userdata.group.id,
        area: this.temp.region.join(''),
        name: this.temp.name,
        contact: this.temp.contact,
        phone: this.temp.phone,
        address: this.temp.address,
        remark: this.temp.remark
      }).then(response => {
        this.$message({ type: 'success', message: '新增成功!' })
        this.getGroupStorage()
        this.dialogVisible = false
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      const temp = []
      temp.push(row.area.slice(0, 6))
      temp.push(row.area.slice(6, 12))
      temp.push(row.area.slice(12, 18))
      this.temp.region = temp
      this.dialogStatus = 'update'
      this.dialogVisible = true
    },
    updateData() {
      if (!this.temp.region || this.temp.region.length <= 0) {
        this.$message({ type: 'error', message: '请选择仓库地区' })
        return
      }
      setStorage({
        id: this.listQuery.id,
        gid: this.userdata.group.id,
        sid: this.temp.id,
        area: this.temp.region.join(''),
        name: this.temp.name,
        contact: this.temp.contact,
        phone: this.temp.phone,
        address: this.temp.address,
        remark: this.temp.remark
      }).then(response => {
        this.$message({ type: 'success', message: '修改成功!' })
        this.getGroupStorage()
        this.dialogVisible = false
      })
    },
    handleDelete(row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delStorage({
          id: this.listQuery.id,
          gid: this.userdata.group.id,
          sid: row.id
        }).then(response => {
          this.$message({ type: 'success', message: '删除成功!' })
          this.getGroupStorage()
        })
      })
    }
  }
}
</script>
