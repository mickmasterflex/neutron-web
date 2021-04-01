import axios from '@/axios'
import visibility from '@/store/modules/forms/injected/injected-field-types/visibility'

const modules = {
  visibility
}

const state = {
  injected_field_types: [],
  current_injected_field_type: null
}
const getters = {
  getCurrentInjectedFieldType: state => state.current_injected_field_type,
  getInjectedFieldTypes: state => state.injected_field_types
}

const actions = {
  async createInjectedFieldType ({ commit }, field) {
    await axios.post('/injected-field-types/', field)
      .then(response => {
        commit('ADD_FIELD', { data: response.data, type: 'injected_field_types' })
      })
  },
  async updateInjectedFieldType ({ commit }, updatedField) {
    await axios.put(`/injected-field-types/${updatedField.id}/`, updatedField)
      .then(response => {
        commit('UPDATE_FIELD', { data: response.data, type: 'injected_field_types' })
      })
  },
  async deleteInjectedFieldType ({ commit }, id) {
    await axios.delete(`/injected-field-types/${id}/`)
      .then(() => {
        commit('REMOVE_FIELD', { id: id, type: 'injected_field_types' })
      })
  }
}

const mutations = {
  SET_CURRENT_INJECTED_FIELD_TYPE: (state, injectedFieldType) => (state.current_injected_field_type = injectedFieldType),
  RESET_CURRENT_INJECTED_FIELD_TYPE: (state) => (state.current_field = null)
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
