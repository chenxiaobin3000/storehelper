<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.action" class="filter-item" style="width:140px" placeholder="请选择类目" @change="handleSelect">
        <el-option v-for="item in labelList" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <el-input v-model="temp.value" class="filter-item" style="width:160px" placeholder="请输入金额" />
      <el-input v-model="temp.remark" class="filter-item" style="width:160px" placeholder="请输入备注" />
      <el-date-picker v-model="date" type="date" class="filter-item" style="width: 150px;" @change="handleSelect" />
      <el-button type="primary" class="button-node filter-item" @click="insertLabelDetail(true)">扣费</el-button>
      <el-button type="danger" class="button-node filter-item" style="float:right;" @click="insertLabelDetail(false)">冲正</el-button>
    </div>
    <el-table ref="table" v-loading="loading" :data="list" :height="tableHeight" style="width: 100%" border fit highlight-current-row>
      <el-table-column label="动作" width="180px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.action }}</span>
        </template>
      </el-table-column>
      <el-table-column label="金额" align="center">
        <template slot-scope="{row}">
          <span>{{ row.value }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作人" width="180px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.user }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.time }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getLabelList" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import { getLabelList, insertLabelDetail } from '@/api/finance'
import { getGroupLabelTree } from '@/api/finance'

export default {
  components: { Pagination },
  data() {
    return {
      tableHeight: 600,
      date: new Date(),
      list: null,
      total: 0,
      labelList: [],
      loading: false,
      listQuery: {
        id: 0,
        page: 1,
        limit: 10,
        action: 0,
        date: null
      },
      temp: {}
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
  mounted: function() {
    setTimeout(() => {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 78
    }, 1000)
  },
  created() {
    this.userdata = this.$store.getters.userdata
    this.listQuery.id = this.userdata.user.id
    this.listQuery.date = parseTime(this.date, '{y}-{m}-{d}')
    this.resetTemp()
    this.getGroupLabelTree()
  },
  methods: {
    resetTemp() {
      this.temp = {
        value: null,
        remark: ''
      }
    },
    handleSelect() {
      this.listQuery.page = 1
      this.listQuery.limit = 10
      this.listQuery.date = parseTime(this.date, '{y}-{m}-{d}')
      this.getLabelList()
    },
    getLabelList() {
      this.loading = true
      getLabelList(
        this.listQuery
      ).then(response => {
        this.total = response.data.data.total
        this.list = response.data.data.list
        this.loading = false
      }).catch(error => {
        this.loading = false
        Promise.reject(error)
      })
    },
    getGroupLabelTree() {
      getGroupLabelTree({
        id: this.listQuery.id
      }).then(response => {
        this.labelList = [{ id: 0, label: '全部' }]
        this.generator(response.data.data.list)
        this.getLabelList()
      })
    },
    generator(tree) {
      tree.forEach(v => {
        this.labelList.push(v)
        if (v.children != null) {
          this.generator(v.children)
        }
      })
    },
    insertLabelDetail(sub) {
      insertLabelDetail({
        id: this.listQuery.id,
        gid: this.userdata.group.id,
        action: this.listQuery.action,
        aid: 0,
        value: this.temp.value,
        remark: this.temp.remark,
        date: this.listQuery.date,
        sub: sub ? 1 : 0
      }).then(response => {
        this.getLabelList()
      })
    }
  }
}
</script>
