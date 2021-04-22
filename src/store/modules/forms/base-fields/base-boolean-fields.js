import axios from '@/axios'

const state = {
  base_boolean_fields: []
}

const actions = {
  async fetchBaseBooleanFields ({ commit }) {
    await axios.get('/base-boolean-fields/')
      .then(response => {
        commit('SET_BASE_BOOLEAN_FIELDS', response.data)
      })
  },
  async createBaseBooleanField ({ commit }, field) {
    await axios.post('/base-boolean-fields/', field)
      .then(response => {
        commit('ADD_BASE_BOOLEAN_FIELD', response.data)
        commit('SET_BASE_FIELDS')
      })
  },
  async updateBaseBooleanField ({ commit }, updatedField) {
    await axios.put(`/base-boolean-fields/${updatedField.id}/`, updatedField)
      .then(response => {
        commit('UPDATE_BASE_BOOLEAN_FIELD', response.data)
        commit('SET_BASE_FIELDS')
      })
  },
  async deleteBaseBooleanField ({ commit }, id) {
    await axios.delete(`/base-boolean-fields/${id}/`)
      .then(() => {
        commit('REMOVE_BASE_BOOLEAN_FIELD', id)
        commit('SET_BASE_FIELDS')
      })
  }
}

const mutations = {
  ADD_BASE_BOOLEAN_FIELD: (state, field) => state.base_boolean_fields.unshift(field),
  SET_BASE_BOOLEAN_FIELDS: (state, fields) => (state.base_boolean_fields = fields),
  UPDATE_BASE_BOOLEAN_FIELD: (state, updatedField) => {
    const index = state.base_boolean_fields.findIndex(field => field.id === updatedField.id)
    if (index !== -1) {
      state.base_boolean_fields.splice(index, 1, updatedField)
    }
  },
  REMOVE_BASE_BOOLEAN_FIELD: (state, id) => (state.base_boolean_fields = state.base_boolean_fields.filter(field => field.id !== id))
}

export default {
  state,
  actions,
  mutations
}
