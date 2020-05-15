import axios from '@/axios'

const state = {
  current_option_field: null,
  show_update_option_field: false
}

const getters = {
  getCurrentOptionField: state => state.current_option_field,
  getShowUpdateOptionField: state => state.show_update_option_field
}

const actions = {
  async fetchCurrentOptionField ({ commit }, id) {
    await axios.get(`/option-fields/${id}/`)
      .then(response => {
        commit('SET_CURRENT_OPTION_FIELD', response.data)
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
  SET_CURRENT_OPTION_FIELD: (state, field) => (state.current_option_field = field),
  RESET_CURRENT_OPTION_FIELD: (state) => (state.current_option_field = null),
  TOGGLE_SHOW_UPDATE_OPTION_FIELD: (state, bool) => (state.show_update_option_field = bool)
}

export default {
  state,
  getters,
  actions,
  mutations
}
