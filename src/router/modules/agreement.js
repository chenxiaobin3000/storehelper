import Layout from '@/layout'

const agreementRouter = {
  path: '/agreement',
  component: Layout,
  name: 'agreement',
  meta: {
    title: '履约管理',
    roles: [200]
  },
  children: [{
    path: 'getList', component: () => import('@/views/agreement/getList'),
    name: 'agreement_getList', meta: { title: '履约总览', roles: [201] }
  }, {
    path: 'report', component: () => import('@/views/agreement/report'),
    name: 'agreement_report', meta: { title: '损耗报表', roles: [203] }
  }, {
    path: 'sendOut', component: () => import('@/views/agreement/sendOut'),
    name: 'agreement_sendOut', meta: { title: '出库实收', roles: [204] }
  }, {
    path: 'goBack', component: () => import('@/views/agreement/goBack'),
    name: 'agreement_goBack', meta: { title: '应退实退', roles: [202] }
  }]
}

export default agreementRouter
