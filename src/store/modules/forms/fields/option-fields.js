import axios from '@/axios'
import options from '@/store/modules/forms/fields/options'

const modules = {
  options
}

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
        commit('SET_CURRENT_OPTIONS', response.data.options)
        commit('SORT_CURRENT_OPTIONS')
      })
  },
  async createOptionField ({ commit }, field) {
    await axios.post('/option-fields/', field)
      .then(response => {
        commit('ADD_FIELD', response.data)
        commit('SET_CURRENT_FIELD', response.data)
        commit('SET_CURRENT_OPTIONS', response.data.options)
        commit('SORT_CURRENT_OPTIONS')
        commit('TOGGLE_SHOW_CREATE_FIELD', false)
      })
  },
  async updateOptionField ({ commit }, updatedField) {
    await axios.put(`/option-fields/${updatedField.id}/`, updatedField)
      .then(response => {
        commit('UPDATE_FIELD', response.data)
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
  modules,
  state,
  getters,
  actions,
  mutations
}