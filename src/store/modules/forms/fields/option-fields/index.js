import axios from '@/axios'
import options from '@/store/modules/forms/fields/option-fields/options/'
import visibility from '@/store/modules/forms/fields/option-fields/visibility'

const modules = {
  options,
  visibility
}

const actions = {
  async createOptionField ({ commit }, field) {
    await axios.post('/option-fields/', field)
      .then(response => {
        commit('ADD_FIELD', { data: response.data, type: 'fields' })
        commit('SET_CURRENT_FIELD', response.data)
        commit('SET_CURRENT_OPTIONS', response.data.options)
        commit('SET_INACTIVE_OPTIONS', response.data.inactive_options)
        commit('SORT_CURRENT_OPTIONS')
      })
  },
  async updateOptionField ({ commit }, updatedField) {
    await axios.put(`/option-fields/${updatedField.id}/`, updatedField)
      .then(response => {
        commit('UPDATE_FIELD', { data: response.data, type: 'fields' })
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
