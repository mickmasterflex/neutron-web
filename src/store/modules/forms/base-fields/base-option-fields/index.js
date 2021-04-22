import axios from '@/axios'
import baseOptions from '@/store/modules/forms/base-fields/base-option-fields/base-options'

const modules = {
  baseOptions
}

const state = {
  base_option_fields: []
}

const actions = {
  async fetchBaseOptionFields ({ commit }) {
    await axios.get('/base-option-fields/')
      .then(response => {
        commit('SET_BASE_OPTION_FIELDS', response.data)
      })
  },
  async createBaseOptionField ({ commit }, field) {
    await axios.post('/base-option-fields/', field)
      .then(response => {
        commit('ADD_BASE_OPTION_FIELD', response.data)
        commit('SET_BASE_FIELDS')
        commit('SET_CURRENT_BASE_FIELD', response.data)
      })
  },
  async updateBaseOptionField ({ commit }, updatedField) {
    await axios.put(`/base-option-fields/${updatedField.id}/`, updatedField)
      .then(response => {
        commit('UPDATE_BASE_OPTION_FIELD', response.data)
        commit('SET_BASE_FIELDS')
      })
  },
  async deleteBaseOptionField ({ commit }, id) {
    await axios.delete(`/base-option-fields/${id}/`)
      .then(() => {
        commit('REMOVE_BASE_OPTION_FIELD', id)
        commit('SET_BASE_FIELDS')
      })
  }
}

const mutations = {
  SET_BASE_OPTION_FIELDS: (state, fields) => (state.base_option_fields = fields),
  ADD_BASE_OPTION_FIELD: (state, field) => state.base_option_fields.unshift(field),
  UPDATE_BASE_OPTION_FIELD: (state, updatedField) => {
    const index = state.base_option_fields.findIndex(field => field.id === updatedField.id)
    if (index !== -1) {
      state.base_option_fields.splice(index, 1, updatedField)
    }
  },
  REMOVE_BASE_OPTION_FIELD: (state, id) => (state.base_option_fields = state.base_option_fields.filter(field => field.id !== id))
}

export default {
  modules,
  state,
  actions,
  mutations
}
