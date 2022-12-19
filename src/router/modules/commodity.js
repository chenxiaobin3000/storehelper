import Layout from '@/layout'

const commodityRouter = {
  path: '/commodity',
  component: Layout,
  name: 'commodity',
  meta: {
    title: '商品管理',
    roles: ['commodity', 'my_commodity']
  },
  children: [{
    path: 'report', component: () => import('@/views/commodity/report'),
    name: 'report', meta: { title: '销售数据', roles: ['commodity', 'my_commodity'] }
  }, {
    path: 'index', component: () => import('@/views/commodity/index'),
    name: 'index', meta: { title: '商品总览', roles: ['commodity'] }
  }, {
    path: 'getList', component: () => import('@/views/commodity/getList'),
    name: 'getList', meta: { title: '商品总览', roles: ['my_commodity'] }
  }, {
    path: 'myFocus', component: () => import('@/views/commodity/myFocus'),
    name: 'myFocus', meta: { title: '我的关注', roles: ['commodity', 'my_commodity'] }
  }, {
    path: 'getType', component: () => import('@/views/commodity/getType'),
    name: 'getType', meta: { title: '品类设置', roles: ['commodity', 'my_commodity'] }
  }]
}

export default commodityRouter
