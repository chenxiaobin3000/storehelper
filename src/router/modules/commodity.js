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
    path: 'saleReport', component: () => import('@/views/commodity/saleReport'),
    name: 'commodity_saleReport', meta: { title: '销售数据', roles: [304] }
  }, {
    path: 'commodityList', component: () => import('@/views/commodity/commodityList'),
    name: 'commodity_commodityList', meta: { title: '商品列表', roles: [301] }
  }, {
    path: 'setCategory', component: () => import('@/views/commodity/setCategory'),
    name: 'commodity_setCategory', meta: { title: '品类设置', roles: [302] }
  }, {
    path: 'attributeList', component: () => import('@/views/commodity/attributeList'),
    name: 'system_attributeList', meta: { title: '属性管理', roles: [303] }
  }]
}

export default commodityRouter
