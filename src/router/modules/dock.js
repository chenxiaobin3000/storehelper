import Layout from '@/layout'

export default {
  path: '/dock',
  component: Layout,
  name: 'dock',
  meta: {
    title: '平台管理',
    roles: [450]
  },
  children: [{
    path: 'account', component: () => import('@/views/dock/account'),
    name: 'dock_account', meta: { title: '账号明细', roles: [451] }
  }, {
    path: 'many', component: () => import('@/views/dock/many'),
    name: 'dock_many', meta: { title: '聚合账号', roles: [452] }
  }, {
    path: 'storage', component: () => import('@/views/dock/storage'),
    name: 'dock_storage', meta: { title: '账号关联', roles: [453] }
  }, {
    path: 'commodity', component: () => import('@/views/dock/commodity'),
    name: 'dock_commodity', meta: { title: '商品上架', roles: [454] }
  }]
}
