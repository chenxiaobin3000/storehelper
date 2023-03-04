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
    path: 'commodityList', component: () => import('@/views/commodity/commodityList'),
    name: 'commodity_commodityList', meta: { title: '商品列表', roles: [302] }
  }, {
    path: 'halfgoodList', component: () => import('@/views/commodity/halfgoodList'),
    name: 'commodity_halfgoodList', meta: { title: '半成品列表', roles: [303] }
  }, {
    path: 'originalList', component: () => import('@/views/commodity/originalList'),
    name: 'commodity_originalList', meta: { title: '原料列表', roles: [304] }
  }, {
    path: 'standardList', component: () => import('@/views/commodity/standardList'),
    name: 'commodity_standardList', meta: { title: '标品列表', roles: [305] }
  }, {
    path: 'setCategory', component: () => import('@/views/commodity/setCategory'),
    name: 'commodity_setCategory', meta: { title: '品类管理', roles: [306] }
  }, {
    path: 'attributeList', component: () => import('@/views/commodity/attributeList'),
    name: 'commodity_attributeList', meta: { title: '属性管理', roles: [307] }
  }]
}
