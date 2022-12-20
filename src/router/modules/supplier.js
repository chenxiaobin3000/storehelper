import Layout from '@/layout'

const supplierRouter = {
  path: '/supplier',
  component: Layout,
  name: 'supplier',
  meta: {
    title: '供应商管理',
    roles: ['supplier']
  },
  children: [{
    path: 'getList', component: () => import('@/views/supplier/getList'),
    name: 'getList', meta: { title: '供应商列表', roles: ['supplier'] }
  }, {
    path: 'keepBook', component: () => import('@/views/supplier/keepBook'),
    name: 'keepBook', meta: { title: '账款记录', roles: ['supplier'] }
  }]
}

export default supplierRouter
