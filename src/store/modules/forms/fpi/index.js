import axios from '@/axios'
import loading from './loading'

const modules = {
  loading
}

const state = {
  current_fpi: null
}

const getters = {
  getCurrentFpi: state => state.current_fpi
}

const actions = {
  async fetchCurrentFpi ({ commit }, contractId) {
    commit('SET_FETCH_FPI_LOADING')
    await axios.get(`/fpi-download/?contract=${contractId}`)
      .then(response => {
        commit('SET_CURRENT_FPI', response.data)
      }).finally(() => {
        commit('RESET_FETCH_FPI_LOADING')
      })
  }
}

const mutations = {
  SET_CURRENT_FPI: (state, fpi) => (state.current_fpi = fpi),
  RESET_CURRENT_FPI: (state) => (state.current_fpi = null)
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
