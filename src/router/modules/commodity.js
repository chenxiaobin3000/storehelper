import Layout from '@/layout'

const commodityRouter = {
  path: '/commodity',
  component: Layout,
  name: 'commodity',
  meta: {
    title: '商品管理',
    roles: [300]
  },
  children: [{
    path: 'report', component: () => import('@/views/commodity/report'),
    name: 'commodity_report', meta: { title: '销售数据', roles: [304] }
  }, {
    path: 'getList', component: () => import('@/views/commodity/getList'),
    name: 'commodity_getList', meta: { title: '商品列表', roles: [301] }
  }, {
    path: 'myFocus', component: () => import('@/views/commodity/myFocus'),
    name: 'commodity_myFocus', meta: { title: '我的关注', roles: [303] }
  }, {
    path: 'getType', component: () => import('@/views/commodity/getType'),
    name: 'commodity_getType', meta: { title: '品类设置', roles: [302] }
  }]
}

export default commodityRouter
