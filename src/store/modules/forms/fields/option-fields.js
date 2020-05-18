import axios from '@/axios'

const state = {
  show_update_option_field: false
}

const getters = {
  getShowUpdateOptionField: state => state.show_update_option_field
}

const actions = {
  async fetchCurrentOptionField ({ commit }, id) {
    await axios.get(`/option-fields/${id}/`)
      .then(response => {
        commit('SET_CURRENT_FIELD', response.data)
      })
  },
  async createOptionField ({ commit }, field) {
    await axios.post('/option-fields/', field)
      .then(response => {
        commit('ADD_FIELD', response.data)
        commit('SET_CURRENT_FIELD', response.data)
        commit('TOGGLE_SHOW_CREATE_FIELD', false)
      })
  },
  async updateOptionField ({ commit }, updatedField) {
    await axios.put(`/option-fields/${updatedField.id}/`, updatedField)
      .then(() => {
        commit('UPDATE_FIELD', updatedField)
      })
  },
  async deleteOptionField ({ commit }, id) {
    await axios.delete(`/option-fields/${id}/`)
      .then(() => {
        commit('REMOVE_FIELD', id)
      })
  }
}

const mutations = {
  TOGGLE_SHOW_UPDATE_OPTION_FIELD: (state, bool) => (state.show_update_option_field = bool)
}

export default {
  state,
  getters,
  actions,
  mutations
}
