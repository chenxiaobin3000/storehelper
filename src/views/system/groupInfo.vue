<template>
  <div class="app-container" style="padding-top:2%;padding-left:6%">
    <el-form style="width:60%">
      <el-form-item label="公司名称">
        <el-input v-model="name" />
      </el-form-item>
      <el-form-item label="公司地区">
        <el-input v-model="areaName" />
      </el-form-item>
      <el-form-item label="公司地址">
        <el-input v-model="address" />
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="contact" />
      </el-form-item>
      <el-form-item label="资金">
        <el-input v-model="money" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { CodeToText } from 'element-china-area-data'
import { getGroup } from '@/api/group'

export default {
  data() {
    return {
      id: 0,
      gid: 0,
      name: '',
      area: '',
      areaName: '',
      address: '',
      contact: '',
      money: ''
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
      this.$message({ type: 'error', message: '不支持搜索!' })
    },
    create() {
      this.$message({ type: 'error', message: '不支持新建!' })
    }
  },
  created() {
    this.id = this.$store.getters.userdata.user.id
    this.gid = this.$store.getters.userdata.group.id
    this.getGroup()
  },
  methods: {
    getGroup() {
      getGroup({
        id: this.id,
        gid: this.gid
      }).then(response => {
        this.name = response.data.data.name
        this.area = response.data.data.area
        this.address = response.data.data.address
        this.contact = response.data.data.contact
        this.money = '0元'

        const temp = []
        temp.push(this.area.slice(0, 6))
        temp.push(this.area.slice(6, 12))
        temp.push(this.area.slice(12, 18))
        this.areaName = CodeToText[temp[0]] + '/' + CodeToText[temp[1]] + '/' + CodeToText[temp[2]]
      }).catch(error => {
        Promise.reject(error)
      })
    }
  }
}
</script>
