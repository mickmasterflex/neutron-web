import axios from '@/axios'
import visibility from './visibility'

const modules = {
  visibility
}

const state = {
  injected_field_types: [],
  current_injected_field_type: null
}
const getters = {
  getCurrentInjectedFieldType: state => state.current_injected_field_type,
  getInjectedFieldTypes: state => state.injected_field_types,
  getInjectedFieldTypesCount: state => state.injected_field_types.length
}

const actions = {
  async fetchInjectedFieldTypes ({ commit }) {
    await axios.get('/injected-field-types/')
      .then(response => {
        commit('SET_INJECTED_FIELD_TYPES', response.data)
      })
  },
  async createInjectedFieldType ({ commit }, field) {
    await axios.post('/injected-field-types/', field)
      .then(response => {
        commit('ADD_FIELD', { data: response.data, type: 'injected_field_types' })
      }).catch(error => console.log(error.response.data))
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
  SET_INJECTED_FIELD_TYPES: (state, injectedFieldTypes) => (state.injected_field_types = injectedFieldTypes),
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
