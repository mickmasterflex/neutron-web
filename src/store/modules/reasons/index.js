import axios from '@/axios'
import loading from './loading'
import visibility from './visibility'

const modules = {
  loading,
  visibility
}

const state = {
  all_reasons: [],
  current_reason: {}
}

const getters = {
  getAllReasons: state => state.all_reasons,
  getCurrentReason: state => state.current_reason
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
  async updateReason ({ commit }, reason) {
    commit('SET_REASONS_PUT_LOADING')
    await axios.put(`/reasons/${reason.id}/`, reason)
      .then(response => {
        commit('UPDATE_REASON', response.data)
      }).finally(() => {
        commit('RESET_REASONS_PUT_LOADING')
      })
  },
  async deleteReason ({ commit }, id) {
    await axios.delete(`/reasons/${id}/`)
      .then(() => { commit('REMOVE_REASON', id) })
  }
}

const mutations = {
  SET_ALL_REASONS: (state, reasons) => (state.all_reasons = reasons),
  ADD_REASON: (state, reason) => (state.all_reasons.unshift(reason)),
  REMOVE_REASON: (state, id) => (state.all_reasons = state.all_reasons.filter(reason => reason.id !== id)),
  SET_CURRENT_REASON: (state, reason) => (state.current_reason = reason),
  RESET_CURRENT_REASON: (state) => (state.current_reason = {}),
  UPDATE_REASON: (state, updatedReason) => {
    const index = state.all_reasons.findIndex(reason => reason.id === updatedReason.id)
    if (index !== -1) {
      state.all_reasons.splice(index, 1, updatedReason)
    }
  }
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
