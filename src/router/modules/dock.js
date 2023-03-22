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
    path: 'cloud', component: () => import('@/views/dock/cloud'),
    name: 'dock_cloud', meta: { title: '云仓明细', roles: [452] }
  }, {
    path: 'commodity', component: () => import('@/views/dock/commodity'),
    name: 'dock_commodity', meta: { title: '商品明细', roles: [453] }
  }]
}
