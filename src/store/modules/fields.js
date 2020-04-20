import axios from '@/axios'

const state = {
  base_text_fields: []
}

const getters = {
  getBaseTextFields: state => state.base_text_fields
}

const actions = {
  async fetchBaseTextFields ({ commit }) {
    await axios.get('/base-text-fields/')
      .then(response => {
        commit('SET_BASE_TEXT_FIELDS', response.data)
      })
  },
  async createBaseTextField ({ commit }, field) {
    await axios.post('/base-text-fields/', field.field)
      .then(response => {
        commit('ADD_BASE_TEXT_FIELD', response)
      })
      .catch(error => {
        console.log(error)
        console.log(field)
      })
  }
}

const mutations = {
  SET_BASE_TEXT_FIELDS: (state, fields) => (state.base_text_fields = fields),
  ADD_BASE_TEXT_FIELD: (state, field) => state.base_text_fields.unshift(field)
}

export default {
  state,
  getters,
  actions,
  mutations
}
