import axios from '@/axios'
import loading from './loading'
import visibility from './visibility'

const modules = {
  loading,
  visibility
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
  },
  async createReason ({ commit }, reason) {
    commit('SET_REASONS_POST_LOADING')
    await axios.post('/reasons/', reason)
      .then(response => {
        commit('ADD_REASON', response.data)
      }).finally(() => {
        commit('RESET_REASONS_POST_LOADING')
      })
  },
  async deleteReason ({ commit }, id) {
    commit('SET_REASONS_DELETE_LOADING')
    await axios.delete(`/reasons/${id}/`)
      .then(() => {
        commit('REMOVE_CLIENT', id)
      }).finally(() => {
        commit('RESET_REASONS_DELETE_LOADING')
      })
  }
}

const mutations = {
  SET_ALL_REASONS: (state, reasons) => (state.all_reasons = reasons),
  ADD_REASON: (state, reason) => (state.all_reasons.unshift(reason)),
  REMOVE_CLIENT: (state, id) => (state.all_reasons = state.all_reasons.filter(reason => reason.id !== id))
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
