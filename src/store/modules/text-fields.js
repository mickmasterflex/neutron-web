import axios from '@/axios'

const state = {
  current_text_field: null
}

const getters = {
  getCurrentTextField: state => state.current_text_field
}

const actions = {
  async fetchCurrentTextField ({ commit }, id) {
    await axios.get(`/text-fields/${id}/`)
      .then(response => {
        commit('SET_CURRENT_TEXT_FIELD', response.data)
      })
  },
  async updateTextField ({ commit }, updatedField) {
    await axios.put(`/text-fields/${updatedField.id}/`, updatedField)
  },
  async deleteTextField ({ commit }, id) {
    await axios.delete(`/text-fields/${id}/`)
  }
}

const mutations = {
  SET_CURRENT_TEXT_FIELD: (state, field) => (state.current_text_field = field),
  RESET_CURRENT_TEXT_FIELD: (state) => (state.current_text_field = null)
}

export default {
  state,
  getters,
  actions,
  mutations
}
