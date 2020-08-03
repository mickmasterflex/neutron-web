import axios from '@/axios'

const state = {
  show_update_text_field_modal: false
}

const getters = {
  getShowUpdateTextFieldModal: state => state.show_update_text_field_modal
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
  SHOW_UPDATE_TEXT_FIELD_MODAL: (state) => (state.show_update_text_field_modal = true),
  CLOSE_UPDATE_TEXT_FIELD_MODAL: (state) => (state.show_update_text_field_modal = false)
}

export default {
  state,
  getters,
  actions,
  mutations
}
