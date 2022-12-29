import { login, logout } from '@/api/account'
import { getUserInfo } from '@/api/user'
import { setToken, getToken, removeToken, setUserId, getUserId, removeUserId } from '@/utils/cache'
import { resetRouter } from '@/router'
import md5 from 'js-md5'

const state = {
  token: getToken(),
  id: getUserId(),
  roles: [],
  userdata: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USERDATA: (state, userdata) => {
    state.userdata = userdata
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { account, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ account: account.trim(), password: md5(password) }).then(response => {
        const { id, token } = response.data.data
        commit('SET_TOKEN', token)
        commit('SET_ID', id)
        commit('SET_ROLES', [])
        commit('SET_USERDATA', {})
        setUserId(id)
        setToken(token)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo({ id: state.id }).then(response => {
        const { user, group, permissions } = response.data.data
        // roles must be a non-empty array
        if (!permissions || permissions.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        commit('SET_ROLES', permissions)
        commit('SET_USERDATA', {
          user: user,
          group: group
        })
        resolve({
          name: user.name,
          roles: permissions
        })
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout({ id: state.id }).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ID', 0)
        commit('SET_ROLES', [])
        commit('SET_USERDATA', {})
        removeToken()
        removeUserId()
        resetRouter()

        // reset visited views and cached views
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ID', 0)
      commit('SET_ROLES', [])
      commit('SET_USERDATA', {})
      removeToken()
      removeUserId()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
