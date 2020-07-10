import axios from '@/axios'
import router from '@/router'

const state = {
  token: localStorage.getItem('user-token') || '',
  status: ''
}

const getters = {
  isAuthenticated: state => !!state.token,
  getAuthStatus: state => state.status
}

const actions = {
  async authLogin ({ commit, dispatch }, { username, password }) {
    commit('SET_AUTH_LOADING')
    const response = await axios.post('/accounts/login/', { username, password })
    const token = 'Token ' + response.data.key
    localStorage.setItem('user-token', token)
    axios.defaults.headers.common.Authorization = token
    commit('SET_AUTH_TOKEN', token)
    commit('SET_AUTH_SUCCESS')
    router.push({ name: 'Dashboard' })
  },
  async authLogout ({ commit }) {
    return new Promise((resolve) => {
      commit('RESET_AUTH_STATE')
      localStorage.removeItem('user-token')
      delete axios.defaults.headers.common.Authorization
      resolve()
    }).then(() => {
      router.push({ name: 'Login' })
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
