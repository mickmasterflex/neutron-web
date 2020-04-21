import axios from '@/axios'

const state = {
  base_text_fields: []
}

const getters = {
  getBaseTextFields: state => state.base_text_fields,
  getBaseTextFieldById: (state) => (id) => {
    return state.base_text_fields.find(field => field.id === id)
  }
}

const actions = {
  async fetchBaseTextFields ({ commit }) {
    await axios.get('/base-text-fields/')
      .then(response => {
        commit('SET_BASE_TEXT_FIELDS', response.data)
      })
  },
  async createBaseTextField ({ commit }, field) {
    await axios.post('/base-text-fields/', field.field)
      .then(response => {
        commit('ADD_BASE_TEXT_FIELD', response)
      })
  },
  async updateBaseTextField ({ commit }, updatedField) {
    await axios.put(`/clients/${updatedField.id}/`, updatedField)
      .then(() => {
        commit('UPDATE_BASE_TEXT_FIELD', updatedField)
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
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
