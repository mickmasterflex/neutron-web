import axios from '@/axios'

const state = {
  users: []
}

const getters = {
  getAllUsers: state => state.users,
  getUserById: (state) => (id) => {
    return state.users.find(user => user.id === id)
  },
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
  async createUser ({ commit }, user) {
    await axios.post('/clients/', user)
      .then(response => {
        commit('ADD_USER', response.data)
      })
  },
  async updateUser ({ commit }, updatedUser) {
    await axios.put(`/users/${updatedUser.id}/`, updatedUser)
      .then(() => {
        commit('UPDATE_USER', updatedUser)
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
