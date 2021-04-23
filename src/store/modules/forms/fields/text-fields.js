import axios from '@/axios'

const actions = {
  async createTextField ({ commit }, field) {
    commit('SET_FIELDS_POST_LOADING')
    await axios.post('/text-fields/', field)
      .then(response => {
        commit('ADD_FIELD', { data: response.data, type: 'fields' })
        commit('SET_CURRENT_FIELD', response.data)
      }).finally(() => {
        commit('RESET_FIELDS_POST_LOADING')
      })
  },
  async updateTextField ({ commit }, updatedField) {
    commit('SET_FIELDS_PUT_LOADING')
    await axios.put(`/text-fields/${updatedField.id}/`, updatedField)
      .then(response => {
        commit('UPDATE_FIELD', { data: response.data, type: 'fields' })
      }).finally(() => {
        commit('RESET_FIELDS_PUT_LOADING')
      })
  },
  async deleteTextField ({ commit }, id) {
    await axios.delete(`/text-fields/${id}/`)
      .then(() => {
        commit('REMOVE_FIELD', { id: id, type: 'fields' })
      })
  }
}

export default {
  actions
}
