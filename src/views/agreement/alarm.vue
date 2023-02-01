<template>
  <div class="app-container">
    暂无预警记录
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {},
  data() {
    return {
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
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 32px;
  color: #666;
}
</style>
