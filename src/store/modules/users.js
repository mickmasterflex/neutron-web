import axios from '@/axios'

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
    await axios.get('/users/')
      .then(response => {
        commit('SET_USERS', response.data)
      })
  },
  async fetchCurrentUser ({ commit }, id) {
    await axios.get(`/users/${id}/`)
      .then(response => {
        commit('SET_CURRENT_USER', response.data)
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
  state,
  getters,
  actions,
  mutations
}
