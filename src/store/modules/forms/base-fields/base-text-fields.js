import axios from '@/axios'

const state = {
  base_text_fields: []
}

const actions = {
  async fetchBaseTextFields ({ commit }) {
    await axios.get('/base-text-fields/')
      .then(response => {
        commit('SET_BASE_TEXT_FIELDS', response.data)
      })
  },
  async createBaseTextField ({ commit }, field) {
    commit('SET_BASE_FIELDS_POST_LOADING')
    await axios.post('/base-text-fields/', field)
      .then(response => {
        commit('ADD_BASE_TEXT_FIELD', response.data)
        commit('SET_BASE_FIELDS')
      }).finally(() => {
        commit('RESET_BASE_FIELDS_POST_LOADING')
      })
  },
  async updateBaseTextField ({ commit }, updatedField) {
    commit('SET_BASE_FIELDS_PUT_LOADING')
    await axios.put(`/base-text-fields/${updatedField.id}/`, updatedField)
      .then(response => {
        commit('UPDATE_BASE_TEXT_FIELD', response.data)
        commit('SET_BASE_FIELDS')
      }).finally(() => {
        commit('RESET_BASE_FIELDS_PUT_LOADING')
      })
  },
  async deleteBaseTextField ({ commit }, id) {
    await axios.delete(`/base-text-fields/${id}/`)
      .then(() => {
        commit('REMOVE_BASE_TEXT_FIELD', id)
        commit('SET_BASE_FIELDS')
      })
  }
}

const mutations = {
  SET_BASE_TEXT_FIELDS: (state, fields) => (state.base_text_fields = fields),
  ADD_BASE_TEXT_FIELD: (state, field) => state.base_text_fields.unshift(field),
  UPDATE_BASE_TEXT_FIELD: (state, updatedField) => {
    const index = state.base_text_fields.findIndex(field => field.id === updatedField.id)
    if (index !== -1) {
      state.base_text_fields.splice(index, 1, updatedField)
    }
  },
  REMOVE_BASE_TEXT_FIELD: (state, id) => (state.base_text_fields = state.base_text_fields.filter(field => field.id !== id))
}

export default {
  state,
  actions,
  mutations
}
