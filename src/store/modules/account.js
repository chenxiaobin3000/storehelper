import { login, logout } from '@/api/account'
import { getInfo } from '@/api/user'
import { getToken, getUserId, setCache, removeCache } from '@/utils/cache'
import { resetRouter } from '@/router'
import md5 from 'js-md5'

const state = {
  token: getToken(),
  id: getUserId(),
  name: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { account, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ account: account.trim(), password: md5(password) }).then(response => {
        const data = response.data
        if (data.code === 0) {
          const { id, token } = data.data
          commit('SET_TOKEN', token)
          commit('SET_ID', id)
          commit('SET_ROLES', [])
          commit('SET_NAME', '')
          setCache(id, token)
          resolve(response)
        } else {
          reject(data.msg)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo({ id: state.id }).then(response => {
        const data = response.data
        if (data.code === 0) {
          const { roles, name } = data.data
          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject('getInfo: roles must be a non-null array!')
          }

          commit('SET_ROLES', roles)
          commit('SET_NAME', name)
          resolve(data.data)
        } else {
          reject(data.msg)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ID', 0)
        commit('SET_NAME', '')
        commit('SET_ROLES', [])
        removeCache()
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
      commit('SET_NAME', '')
      commit('SET_ROLES', [])
      removeCache()
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
