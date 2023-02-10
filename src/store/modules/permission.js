import { asyncRoutes, constantRoutes } from '@/router'
import { pddRouter, meituanRouter, kuailvRouter } from '@/router/modules/market'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

function fixRoutes(asyncRoutes, markets) {
  // 添加销售平台节点
  if (asyncRoutes[1].children.length < 3) {
    if (markets.includes(1)) {
      asyncRoutes[1].children.push(pddRouter)
    }
    if (markets.includes(2)) {
      asyncRoutes[1].children.push(meituanRouter)
    }
    if (markets.includes(3)) {
      asyncRoutes[1].children.push(kuailvRouter)
    }
  }
  return asyncRoutes
}

const actions = {
  generateRoutes({ commit }, data) {
    return new Promise(resolve => {
      // 根据对接销售平台，添加节点
      const newRoutes = fixRoutes(asyncRoutes, data.markets)
      const accessedRoutes = filterAsyncRoutes(newRoutes, data.roles)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
