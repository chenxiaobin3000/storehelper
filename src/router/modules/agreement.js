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
    path: 'report', component: () => import('@/views/report/agreement'),
    name: 'agreement_report', meta: { title: '履约总览', roles: [201] }
  }, {
    path: 'getList', component: () => import('@/views/agreement/getList'),
    name: 'agreement_getList', meta: { title: '履约明细', roles: [202] }
  }, {
    path: 'alarm', component: () => import('@/views/agreement/alarm'),
    name: 'agreement_alarm', meta: { title: '退货预警', roles: [203] }
  }]
}

export default agreementRouter
