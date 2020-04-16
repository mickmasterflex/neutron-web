import axios from '@/axios'

const state = {
  token: localStorage.getItem('user-token') || '',
  status: ''
}

const getters = {
  isAuthenticated: state => !!state.token,
  getAuthStatus: state => state.status
}

const actions = {
  authLogin: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit('SET_AUTH_LOADING')
      axios({ url: '/accounts/login/', data: user, method: 'POST' })
        .then(resp => {
          const token = 'Token ' + resp.data.key
          localStorage.setItem('user-token', token)
          axios.defaults.headers.common.Authorization = token
          commit('SET_AUTH_TOKEN', token)
          commit('SET_AUTH_SUCCESS')
          resolve(resp)
        })
        .catch(err => {
          commit('SET_AUTH_ERROR', err)
          localStorage.removeItem('user-token')
          reject(err)
        })
    })
  },
  authLogout: ({ commit }) => {
    return new Promise((resolve) => {
      commit('RESET_AUTH_STATE')
      localStorage.removeItem('user-token')
      delete axios.defaults.headers.common.Authorization
      resolve()
    })
  }
}

const mutations = {
  SET_AUTH_LOADING: (state) => (state.status = 'loading'),
  SET_AUTH_ERROR: (state) => (state.status = 'error'),
  SET_AUTH_SUCCESS: (state) => (state.status = 'success'),
  SET_AUTH_TOKEN: (state, token) => (state.token = token),
  RESET_AUTH_STATE: (state) => {
    state.status = ''
    state.token = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
