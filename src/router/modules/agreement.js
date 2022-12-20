import Layout from '@/layout'

const agreementRouter = {
  path: '/agreement',
  component: Layout,
  name: 'agreement',
  meta: {
    title: '履约管理',
    roles: ['agreement']
  },
  children: [{
    path: 'index', component: () => import('@/views/agreement/index'),
    name: 'index', meta: { title: '履约总览', roles: ['agreement'] }
  }, {
    path: 'report', component: () => import('@/views/agreement/report'),
    name: 'report', meta: { title: '损耗报表', roles: ['agreement'] }
  }, {
    path: 'sendOut', component: () => import('@/views/agreement/sendOut'),
    name: 'sendOut', meta: { title: '出库实收', roles: ['agreement'] }
  }, {
    path: 'goBack', component: () => import('@/views/agreement/goBack'),
    name: 'goBack', meta: { title: '应退实退', roles: ['agreement'] }
  }]
}

export default agreementRouter
