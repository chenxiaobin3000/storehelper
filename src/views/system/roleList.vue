<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="rolesList" style="width: 100%;" border highlight-current-row>
      <el-table-column align="center" label="角色名称" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色描述">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="220">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'修改角色信息':'新建角色'">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="角色名称">
          <el-input v-model="role.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input
            v-model="role.description"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="权限">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routes"
            :props="defaultProps"
            show-checkbox
            node-key="path"
            class="permission-tree"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmRole">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from 'path'
import { mapState } from 'vuex'
import { deepClone } from '@/utils'
import MyRoleData from '@/utils/role-data'
import { getRoleList, addRole, delRole, setRole, getRole } from '@/api/role'

const defaultRole = {
  id: 0,
  name: '',
  description: '',
  routes: []
}

export default {
  data() {
    return {
      role: Object.assign({}, defaultRole),
      userdata: {},
      routes: [],
      rolesList: [],
      loading: false,
      searchword: null,
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
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
      this.getRoles()
    },
    create() {
      this.handleAddRole()
    }
  },
  created() {
    this.userdata = this.$store.getters.userdata
    this.routes = this.generateRoutes(MyRoleData)
    this.getRoles()
  },
  methods: {
    getRoles() {
      this.loading = true
      getRoleList({
        id: this.userdata.user.id,
        gid: this.userdata.group.id,
        search: this.searchword
      }).then(response => {
        this.rolesList = response.data.data.roles
        this.rolesList.forEach(role => {
          // 角色列表没有包含权限信息
          role.routes = null
        })
        this.loading = false
      }).catch(error => {
        this.loading = false
        Promise.reject(error)
      })
    },
    generateRoutes(routes, basePath = '/') {
      const res = []
      for (let route of routes) {
        // skip some route
        if (route.hidden) { continue }

        const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)
        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild
        }

        const data = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title
        }

        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path)
        }
        res.push(data)
      }
      return res
    },
    generateArr(routes, basePath = '/') {
      let data = []
      routes.forEach(route => {
        const fullPath = path.resolve(basePath, route.path)
        data.push({
          path: fullPath,
          title: route.meta && route.meta.title
        })
        if (route.children) {
          const temp = this.generateArr(route.children, fullPath)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },
    handleAddRole() {
      this.role = Object.assign({}, defaultRole)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.role = deepClone(scope.row)
      if (this.role.routes) {
        this.checkStrictly = true // 保护父子节点不相互影响
        this.$nextTick(() => {
          const routes = this.filterAsyncRoutes(this.$store.getters.routes, this.role.routes)
          this.$refs.tree.setCheckedNodes(this.generateArr(routes))
          this.checkStrictly = false
        })
      } else {
        getRole({
          id: this.userdata.user.id,
          rid: this.role.id
        }).then(response => {
          this.role.routes = response.data.data.permissions
          scope.row.routes = this.role.routes
          this.checkStrictly = true // 保护父子节点不相互影响
          this.$nextTick(() => {
            const routes = this.filterAsyncRoutes(this.$store.getters.routes, this.role.routes)
            this.$refs.tree.setCheckedNodes(this.generateArr(routes))
            this.checkStrictly = false
          })
        })
      }
    },
    handleDelete({ $index, row }) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delRole({
          id: this.userdata.user.id,
          rid: row.id
        }).then(response => {
          this.$message({ type: 'success', message: '删除成功!' })
          this.getRoles()
        })
      })
    },
    generateTree(routes, basePath = '/', checkedKeys) {
      const res = []
      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)
        let sub = false
        if (route.children) {
          const children = this.generateTree(route.children, routePath, checkedKeys)
          if (children && children.length > 0) {
            children.forEach(role => {
              res.push(role)
            })
            sub = true
          }
        }
        if (sub || checkedKeys.includes(routePath)) {
          if (route.meta && route.meta.roles) {
            route.meta.roles.forEach(role => {
              res.push(role)
            })
          }
        }
      }
      return res
    },
    confirmRole() {
      const isEdit = this.dialogType === 'edit'
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      this.role.routes = this.generateTree(this.$store.getters.routes, '/', checkedKeys)
      if (isEdit) {
        setRole({
          id: this.userdata.user.id,
          rid: this.role.id,
          gid: this.userdata.group.id,
          name: this.role.name,
          desc: this.role.description,
          permissions: this.role.routes
        }).then(response => {
          this.$message({ type: 'success', message: '修改成功!' })
          this.getRoles()
          this.dialogVisible = false
        })
        // 清除缓存路由，下次展示直接从服务器获取数据
        this.rolesList.forEach(role => {
          if (role.id === this.role.id) {
            role.routes = null
          }
        })
      } else {
        addRole({
          id: this.userdata.user.id,
          gid: this.userdata.group.id,
          name: this.role.name,
          desc: this.role.description,
          permissions: this.role.routes
        }).then(response => {
          this.$message({ type: 'success', message: '新增成功!' })
          this.getRoles()
          this.dialogVisible = false
        })
      }
    },
    // 若节点只存在一个子节点，就用子节点代替父节点
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)

      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }
      return false
    },
    // 以下是从store/permision拷贝过来
    hasPermission(roles, route) {
      if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
      } else {
        return true
      }
    },
    filterAsyncRoutes(routes, roles) {
      const res = []
      routes.forEach(route => {
        const tmp = { ...route }
        if (this.hasPermission(roles, tmp)) {
          if (tmp.children) {
            tmp.children = this.filterAsyncRoutes(tmp.children, roles)
          }
          res.push(tmp)
        }
      })
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
