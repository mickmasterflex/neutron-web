import axios from '@/axios'

const state = {
  current_text_field: null,
  current_form: null,
  show_update_text_field: false
}

const getters = {
  getCurrentTextField: state => state.current_text_field,
  getShowUpdateTextField: state => state.show_update_text_field
}

const actions = {
  async fetchCurrentTextField ({ commit }, id) {
    await axios.get(`/text-fields/${id}/`)
      .then(response => {
        commit('SET_CURRENT_TEXT_FIELD', response.data)
      })
  },
  async createTextField ({ commit }, field) {
    await axios.post('/text-fields/', field)
      .then(response => {
        commit('ADD_FIELD', response.data)
      })
  },
  async updateTextField ({ commit }, updatedField) {
    await axios.put(`/text-fields/${updatedField.id}/`, updatedField)
      .then(() => {
        commit('UPDATE_FIELD', updatedField)
      })
  },
  async deleteTextField ({ commit }, id) {
    await axios.delete(`/text-fields/${id}/`)
      .then(() => {
        commit('REMOVE_FIELD', id)
      })
  }
}

const mutations = {
  SET_CURRENT_TEXT_FIELD: (state, field) => (state.current_text_field = field),
  RESET_CURRENT_TEXT_FIELD: (state) => (state.current_text_field = null),
  TOGGLE_SHOW_UPDATE_TEXT_FIELD: (state, bool) => (state.show_update_text_field = bool)
}

export default {
  state,
  getters,
  actions,
  mutations
}
