import Layout from '@/layout'

export default {
  path: '/commodity',
  component: Layout,
  name: 'commodity',
  meta: {
    title: '商品管理',
    roles: [300]
  },
  children: [{
    path: 'report', component: () => import('@/views/commodity/report'),
    name: 'commodity_report', meta: { title: '销售数据', roles: [301] }
  }, {
    path: 'commodity', component: () => import('@/views/commodity/commodity'),
    name: 'commodity_commodity', meta: { title: '商品列表', roles: [302] }
  }, {
    path: 'halfgood', component: () => import('@/views/commodity/halfgood'),
    name: 'commodity_halfgood', meta: { title: '半成品列表', roles: [303] }
  }, {
    path: 'original', component: () => import('@/views/commodity/original'),
    name: 'commodity_original', meta: { title: '原料列表', roles: [304] }
  }, {
    path: 'category', component: () => import('@/views/commodity/category'),
    name: 'commodity_category', meta: { title: '品类管理', roles: [306] }
  }, {
    path: 'attribute', component: () => import('@/views/commodity/attribute'),
    name: 'commodity_attribute', meta: { title: '属性管理', roles: [307] }
  }]
}
