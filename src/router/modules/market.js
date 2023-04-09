import Layout from '@/layout'

export default {
  path: '/market',
  component: Layout,
  name: 'market',
  meta: {
    title: '销售管理',
    roles: [500]
  },
  children: [{
    path: 'report', component: () => import('@/views/market/report'),
    name: 'market_report', meta: { title: '销售总览', roles: [501] }
  }, {
    path: 'getList', component: () => import('@/views/market/getList'),
    name: 'market_getList', meta: { title: '销售明细', roles: [502] }
  }, {
    path: 'after', component: () => import('@/views/market/after'),
    name: 'market_after', meta: { title: '售后明细', roles: [504] }
  }, {
    path: 'loss', component: () => import('@/views/market/loss'),
    name: 'market_loss', meta: { title: '损耗明细', roles: [505] }
  }, {
    path: 'apply', component: () => import('@/views/market/apply'),
    name: 'market_apply', meta: { title: '订单录入', roles: [506] }
  }, {
    path: 'input', component: () => import('@/views/market/input'),
    name: 'market_input', meta: { title: '价格录入', roles: [503] }
  }]
}
