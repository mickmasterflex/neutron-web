import axios from '@/axios'
import visibility from './visibility'

const modules = {
  visibility
}

const state = {
  injected_fields: [],
  current_injected_field: null
}
const getters = {
  getCurrentInjectedField: state => state.current_injected_field
}

const actions = {
  async createInjectedField ({ commit }, field) {
    await axios.post('/injected-fields/', field)
      .then(response => {
        commit('ADD_FIELD', { data: response.data, type: 'injected_fields' })
      })
  },
  async updateInjectedField ({ commit }, updatedField) {
    await axios.put(`/injected-fields/${updatedField.id}/`, updatedField)
      .then(response => {
        commit('UPDATE_FIELD', { data: response.data, type: 'injected_fields' })
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
