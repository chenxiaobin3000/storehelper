<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="list" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="用户名称" width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="部门" width="140px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.part.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公司角色" width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.role.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="小程序角色" width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.rolemp.name }} </span>
          <el-button type="Info" size="mini" @click="handleUpdateMp(row)">
            修改
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="220" class-name="small-padding fixed-width">
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

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getUserList" />

    <!-- 用户信息编辑 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogVisible">
      <el-form :model="temp" label-position="left" label-width="70px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="temp.phone" />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="temp.part.name" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="temp.role.id" class="filter-item" placeholder="请选择角色">
            <el-option v-for="item in grouproles" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="dialogStatus==='create'" label="说明" prop="role">
          <div style="width: 240px">新用户注册后，使用"用户名"做为账号进行登陆，默认密码为: 123456</div>
        </el-form-item>
        <el-form-item v-else label="说明" prop="role">
          <div style="width: 220px">修改用户名只影响系统内部显示，登陆账号不会变化</div>
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

    <!-- 小程序权限编辑 -->
    <el-dialog title="修改小程序角色" :visible.sync="dialogMpVisible">
      <el-form :model="tempMp" label-position="left" label-width="70px" style="width: 100%; padding: 0 4% 0 4%;">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="tempMp.name" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="tempMp.role.id" class="filter-item" placeholder="请选择角色">
            <el-option v-for="item in grouproleMps" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateDataMp()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination'
import { getUserList, addUser, setUser, delUser } from '@/api/user'
import { getGroupRole, setUserRole } from '@/api/role'
import { getGroupRoleMp, setUserRoleMp } from '@/api/rolemp'

export default {
  components: { Pagination },
  data() {
    return {
      grouproles: null, // 本公司所有角色列表
      grouproleMps: null, // 本公司所有小程序角色列表
      list: null,
      total: 0,
      loading: false,
      oldRole: '', // 保存修改界面的旧角色id
      listQuery: {
        id: 0,
        page: 1,
        limit: 20,
        search: null
      },
      temp: {},
      tempMp: {},
      dialogVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改用户信息',
        create: '新增用户'
      },
      dialogMpVisible: false
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
      this.getUserList()
    },
    create() {
      this.resetTemp()
      this.resetTempMp()
      this.dialogStatus = 'create'
      this.dialogVisible = true
    }
  },
  created() {
    this.listQuery.id = this.$store.getters.userdata.user.id
    this.resetTemp()
    this.resetTempMp()
    this.getUserList()
    getGroupRole({
      id: this.listQuery.id
    }).then(response => {
      this.grouproles = response.data.data.list
    })
    getGroupRoleMp({
      id: this.listQuery.id
    }).then(response => {
      this.grouproleMps = response.data.data.list
      if (this.grouproleMps.length > 0) {
        this.grouproleMps.unshift({
          id: 0,
          gid: this.grouproleMps[0].gid,
          name: '不分配角色',
          description: ''
        })
      }
    })
  },
  methods: {
    resetTemp() {
      this.temp = {
        id: 0,
        name: '',
        phone: '',
        part: { name: '' },
        role: { id: null, name: '' }
      }
    },
    resetTempMp() {
      this.tempMp = {
        id: 0,
        name: '',
        role: { id: null, name: '' }
      }
    },
    getUserList() {
      this.loading = true
      getUserList(
        this.listQuery
      ).then(response => {
        this.total = response.data.data.total
        this.list = response.data.data.list
        this.list.forEach(v => {
          if (v.part == null) {
            v.part = { name: '' }
          }
          if (v.role == null) {
            v.role = { id: 0, name: '无' }
          }
          if (v.rolemp == null) {
            v.rolemp = { id: 0, name: '无' }
          }
        })
        this.loading = false
      }).catch(error => {
        this.loading = false
        Promise.reject(error)
      })
    },
    createData() {
      addUser({
        id: this.listQuery.id,
        account: this.temp.name,
        phone: this.temp.phone,
        rid: this.temp.role.id
      }).then(response => {
        this.$message({ type: 'success', message: '新增成功!' })
        this.getUserList()
        this.dialogVisible = false
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.oldRole = this.temp.role.id
      this.dialogStatus = 'update'
      this.dialogVisible = true
    },
    updateData() {
      if (this.oldRole !== this.temp.role.id) {
        setUserRole({
          id: this.listQuery.id,
          uid: this.temp.id,
          rid: this.temp.role.id
        }).then(response => {
          this.setUser()
        })
      } else {
        this.setUser()
      }
    },
    setUser() {
      setUser({
        id: this.listQuery.id,
        uid: this.temp.id,
        name: this.temp.name,
        phone: this.temp.phone
      }).then(response => {
        this.$message({ type: 'success', message: '修改成功!' })
        this.getUserList()
        this.dialogVisible = false
      })
    },
    handleDelete(row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUser({
          id: this.listQuery.id,
          uid: row.id
        }).then(response => {
          this.$message({ type: 'success', message: '删除成功!' })
          this.getUserList()
        })
      })
    },
    handleUpdateMp(row) {
      this.tempMp = {
        id: row.id,
        name: row.name,
        role: { id: row.rolemp.id, name: row.rolemp.name }
      }
      this.dialogMpVisible = true
    },
    updateDataMp() {
      setUserRoleMp({
        id: this.listQuery.id,
        uid: this.tempMp.id,
        rid: this.tempMp.role.id
      }).then(response => {
        this.$message({ type: 'success', message: '修改成功!' })
        this.getUserList()
        this.dialogMpVisible = false
      })
    }
  }
}
</script>
