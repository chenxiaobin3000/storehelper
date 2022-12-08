import Layout from '@/layout'

const supplierRouter = {
  path: '/supplier', component: Layout, redirect: '/supplier/index',
  name: 'supplier', meta: { title: '供应商管理', roles: ['supplier'] },
  children: [
    {
      path: 'getInfo', component: () => import('@/views/supplier/getInfo'),
      name: 'getInfo', meta: { title: '供应商信息', roles: ['supplier'] }
    },
    {
      path: 'getDetail', component: () => import('@/views/supplier/getDetail'),
      name: 'getDetail', meta: { title: '供应商详情', roles: ['supplier'] }
    }
  ]
}

export default supplierRouter
