import axios from '@/axios'
import loading from './loading'

const modules = {
  loading
}

const state = {
  all_reasons: []
}

const getters = {
  getAllReasons: state => state.all_reasons
}

const actions = {
  async fetchReasons ({ commit }) {
    commit('SET_REASONS_FETCH_LOADING')
    await axios.get('/reasons/')
      .then(response => {
        commit('SET_ALL_REASONS', response.data)
      }).finally(() => {
        commit('RESET_REASONS_FETCH_LOADING')
      })
  }
}

const mutations = {
  SET_ALL_REASONS: (state, reasons) => (state.all_reasons = reasons)
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
