import axios from '@/axios'

const state = {
  current_fpi: {}
}

const getters = {
  getCurrentFpi: state => state.current_fpi
}

const actions = {
  async fetchCurrentFpi ({ commit }, contractId) {
    await axios.get(`/fpi-download/?contract=${contractId}`)
      .then(response => {
        commit('SET_CURRENT_FPI', response.data)
      })
  }
}

const mutations = {
  SET_CURRENT_FPI: (state, fpi) => (state.current_fpi = fpi),
  RESET_CURRENT_FPI: (state) => (state.current_fpi = {})
}

export default {
  state,
  getters,
  actions,
  mutations
}
