import axios from '@/axios'
import loading from '@/store/modules/users/loading'
import visibility from '@/store/modules/users/visibility'
import currentUser from '@/store/modules/users/current-user'

const modules = {
  loading,
  visibility,
  currentUser
}

const state = {
  users: [],
  current_user: {}
}

const getters = {
  getAllUsers: state => state.users,
  getCurrentUser: state => state.current_user,
  getAllUsersCount: (state) => {
    return state.users.length
  }
}

const actions = {
  async fetchUsers ({ commit }) {
    commit('SET_USERS_FETCH_LOADING')
    await axios.get('/users/')
      .then(response => {
        commit('SET_USERS', response.data)
        commit('RESET_USERS_FETCH_LOADING')
      })
  },
  async fetchCurrentUser ({ commit }, id) {
    commit('SET_USER_FETCH_LOADING')
    await axios.get(`/users/${id}/`)
      .then(response => {
        commit('SET_CURRENT_USER', response.data)
        commit('RESET_USER_FETCH_LOADING')
      })
  },
  async createUser ({ commit }, user) {
    await axios.post('/users/', user)
      .then(response => {
        commit('ADD_USER', response.data)
      })
  },
  async updateUser ({ commit }, updatedUser) {
    await axios.put(`/users/${updatedUser.id}/`, updatedUser)
      .then(response => {
        commit('UPDATE_USER', response.data)
        commit('SET_CURRENT_USER', response.data)
      })
  },
  async deleteUser ({ commit }, id) {
    await axios.delete(`/users/${id}/`)
      .then(() => {
        commit('REMOVE_USER', id)
      })
  }
}

const mutations = {
  SET_USERS: (state, users) => (state.users = users),
  SET_CURRENT_USER: (state, user) => (state.current_user = user),
  RESET_CURRENT_USER: (state) => (state.current_user = {}),
  ADD_USER: (state, user) => state.users.unshift(user),
  UPDATE_USER: (state, updatedUser) => {
    const index = state.users.findIndex(user => user.id === updatedUser.id)
    if (index !== -1) {
      state.users.splice(index, 1, updatedUser)
    }
  },
  REMOVE_USER: (state, id) => (state.users = state.users.filter(user => user.id !== id))
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
