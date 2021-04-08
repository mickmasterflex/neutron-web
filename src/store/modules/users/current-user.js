import axios from '@/axios'

const modules = {
}

const state = {
  current_active_user: null
}

const getters = {
  getCurrentActiveUser: state => state.current_active_user
}

const actions = {
  async fetchCurrentActiveUser ({ commit }) {
    await axios.get('/current-user/')
      .then(response => {
        commit('SET_CURRENT_ACTIVE_USER', response.data)
      })
  }
}

const mutations = {
  SET_CURRENT_ACTIVE_USER: (state, user) => (state.current_active_user = user)
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
