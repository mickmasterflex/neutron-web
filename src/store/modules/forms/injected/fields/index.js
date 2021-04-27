import axios from '@/axios'
import visibility from './visibility'
import loading from './loading'

const modules = {
  visibility,
  loading
}

const state = {
  current_injected_field: null
}
const getters = {
  getCurrentInjectedField: state => state.current_injected_field
}

const actions = {
  async createInjectedField ({ commit }, field) {
    commit('SET_INJECTED_FIELDS_POST_LOADING')
    await axios.post('/injected-fields/', field)
      .then(response => {
        commit('ADD_FIELD', { data: response.data, type: 'injected_fields' })
      }).finally(() => {
        commit('RESET_INJECTED_FIELDS_POST_LOADING')
      })
  },
  async updateInjectedField ({ commit }, updatedField) {
    commit('SET_INJECTED_FIELDS_PUT_LOADING')
    await axios.put(`/injected-fields/${updatedField.id}/`, updatedField)
      .then(response => {
        commit('UPDATE_FIELD', { data: response.data, type: 'injected_fields' })
      }).finally(() => {
        commit('RESET_INJECTED_FIELDS_PUT_LOADING')
      })
  },
  async deleteInjectedField ({ commit }, id) {
    await axios.delete(`/injected-fields/${id}/`)
      .then(() => {
        commit('REMOVE_FIELD', { id: id, type: 'injected_fields' })
      })
  }
}

const mutations = {
  SET_CURRENT_INJECTED_FIELD: (state, injectedField) => (state.current_injected_field = injectedField),
  RESET_CURRENT_INJECTED_FIELD: (state) => (state.current_field = null)
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
