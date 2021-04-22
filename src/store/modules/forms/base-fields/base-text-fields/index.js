import axios from '@/axios'

const state = {
  base_text_fields: [],
  show_update_base_text_field_modal: false
}

const getters = {
  getShowUpdateBaseTextFieldModal: state => state.show_update_base_text_field_modal
}

const actions = {
  async fetchBaseTextFields ({ commit }) {
    await axios.get('/base-text-fields/')
      .then(response => {
        commit('SET_BASE_TEXT_FIELDS', response.data)
      })
  },
  async createBaseTextField ({ commit }, field) {
    await axios.post('/base-text-fields/', field)
      .then(response => {
        commit('ADD_BASE_TEXT_FIELD', response.data)
        commit('SET_BASE_FIELDS')
      })
  },
  async updateBaseTextField ({ commit }, updatedField) {
    await axios.put(`/base-text-fields/${updatedField.id}/`, updatedField)
      .then(response => {
        commit('UPDATE_BASE_TEXT_FIELD', response.data)
        commit('SET_BASE_FIELDS', response.data)
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
  REMOVE_BASE_TEXT_FIELD: (state, id) => (state.base_text_fields = state.base_text_fields.filter(field => field.id !== id)),
  SHOW_UPDATE_BASE_TEXT_FIELD_MODAL: (state) => (state.show_update_base_text_field_modal = true),
  CLOSE_UPDATE_BASE_TEXT_FIELD_MODAL: (state) => (state.show_update_base_text_field_modal = false)
}

export default {
  state,
  getters,
  actions,
  mutations
}
