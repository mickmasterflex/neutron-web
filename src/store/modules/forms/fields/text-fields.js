import axios from '@/axios'

const state = {
  show_update_text_field: false
}

const getters = {
  getShowUpdateTextField: state => state.show_update_text_field
}

const actions = {
  async fetchCurrentTextField ({ commit }, id) {
    await axios.get(`/text-fields/${id}/`)
      .then(response => {
        commit('SET_CURRENT_FIELD', response.data)
      })
  },
  async createTextField ({ commit }, field) {
    await axios.post('/text-fields/', field)
      .then(response => {
        commit('ADD_FIELD', response.data)
        commit('SET_CURRENT_FIELD', response.data)
        commit('TOGGLE_SHOW_CREATE_FIELD', false)
      })
  },
  async updateTextField ({ commit }, updatedField) {
    await axios.put(`/text-fields/${updatedField.id}/`, updatedField)
      .then(response => {
        commit('UPDATE_FIELD', response.data)
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
  TOGGLE_SHOW_UPDATE_TEXT_FIELD: (state, bool) => (state.show_update_text_field = bool)
}

export default {
  state,
  getters,
  actions,
  mutations
}
