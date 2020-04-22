import axios from '@/axios'

const state = {
  base_text_fields: [],
  current_base_text_field: {}
}

const getters = {
  getBaseTextFields: state => state.base_text_fields,
  getCurrentBaseTextField: state => state.current_base_text_field
}

const actions = {
  async fetchBaseTextFields ({ commit }) {
    await axios.get('/base-text-fields/')
      .then(response => {
        commit('SET_BASE_TEXT_FIELDS', response.data)
      })
  },
  async fetchCurrentBaseTextField ({ commit }, id) {
    await axios.get(`/base-text-fields/${id}/`)
      .then(response => {
        commit('SET_CURRENT_BASE_TEXT_FIELD', response.data)
      })
  },
  async createBaseTextField ({ commit }, field) {
    await axios.post('/base-text-fields/', field.field)
      .then(response => {
        commit('ADD_BASE_TEXT_FIELD', response.data)
      })
  },
  async updateBaseTextField ({ commit }, updatedField) {
    await axios.put(`/base-text-fields/${updatedField.id}/`, updatedField)
      .then(() => {
        commit('UPDATE_BASE_TEXT_FIELD', updatedField)
      })
  },
  async deleteBaseTextField ({ commit }, id) {
    await axios.delete(`/base-text-fields/${id}/`)
      .then(() => {
        commit('REMOVE_BASE_TEXT_FIELD', id)
      })
  }
}

const mutations = {
  SET_BASE_TEXT_FIELDS: (state, fields) => (state.base_text_fields = fields),
  SET_CURRENT_BASE_TEXT_FIELD: (state, field) => (state.current_base_text_field = field),
  RESET_CURRENT_BASE_TEXT_FIELD: (state) => { state.current_base_text_field = {} },
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
  getters,
  actions,
  mutations
}
