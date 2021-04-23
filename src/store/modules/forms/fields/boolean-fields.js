import axios from '@/axios'

const actions = {
  async createBooleanField ({ commit }, field) {
    await axios.post('/boolean-fields/', field)
      .then(response => {
        commit('ADD_FIELD', { data: response.data, type: 'fields' })
        commit('SET_CURRENT_FIELD', response.data)
      })
  },
  async updateBooleanField ({ commit }, updatedField) {
    commit('SET_FIELDS_PUT_LOADING')
    await axios.put(`/boolean-fields/${updatedField.id}/`, updatedField)
      .then(response => {
        commit('UPDATE_FIELD', { data: response.data, type: 'fields' })
      }).finally(() => {
        commit('RESET_FIELDS_PUT_LOADING')
      })
  },
  async deleteBooleanField ({ commit }, id) {
    await axios.delete(`/boolean-fields/${id}/`)
      .then(() => {
        commit('REMOVE_FIELD', { id: id, type: 'fields' })
      })
  }
}

export default {
  actions
}
