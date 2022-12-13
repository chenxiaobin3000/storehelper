import Layout from '@/layout'

const agreementRouter = {
  path: '/agreement',
  component: Layout,
  redirect: '/agreement/index',
  name: 'agreement',
  meta: {
    title: '履约管理',
    roles: ['agreement']
  },
  children: [{
    path: 'index', component: () => import('@/views/agreement/index'),
    name: 'index', meta: { title: '履约总览', roles: ['agreement'] }
  }, {
    path: 'getInfo', component: () => import('@/views/agreement/getInfo'),
    name: 'getInfo', meta: { title: '履约信息', roles: ['agreement'] }
  }, {
    path: 'getDetail', component: () => import('@/views/agreement/getDetail'),
    name: 'getDetail', meta: { title: '履约详情', roles: ['agreement'] }
  }]
}

export default agreementRouter
