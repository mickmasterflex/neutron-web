import axios from '@/axios'
import options from '@/store/modules/forms/fields/option-fields/options/'

const modules = {
  options
}

const actions = {
  async createOptionField ({ commit }, field) {
    commit('SET_FIELDS_POST_LOADING')
    await axios.post('/option-fields/', field)
      .then(response => {
        commit('ADD_FIELD', { data: response.data, type: 'fields' })
        commit('SET_CURRENT_FIELD', response.data)
        commit('SET_CURRENT_OPTIONS', response.data.options)
        commit('SET_INACTIVE_OPTIONS', response.data.inactive_options)
        commit('SORT_CURRENT_OPTIONS')
      }).finally(() => {
        commit('RESET_FIELDS_POST_LOADING')
      })
  },
  async updateOptionField ({ commit }, updatedField) {
    commit('SET_FIELDS_PUT_LOADING')
    await axios.put(`/option-fields/${updatedField.id}/`, updatedField)
      .then(response => {
        commit('UPDATE_FIELD', { data: response.data, type: 'fields' })
      }).finally(() => {
        commit('RESET_FIELDS_PUT_LOADING')
      })
  },
  async deleteOptionField ({ commit }, id) {
    await axios.delete(`/option-fields/${id}/`)
      .then(() => {
        commit('REMOVE_FIELD', { id: id, type: 'fields' })
      })
  }
}

export default {
  modules,
  actions
}
