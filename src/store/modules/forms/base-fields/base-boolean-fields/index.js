import axios from '@/axios'

const state = {
  base_boolean_fields: []
}

// const getters = {
//   getShowUpdateBaseTextFieldModal: state => state.show_update_base_text_field_modal
// }

const actions = {
  async fetchBaseBooleanFields ({ commit }) {
    await axios.get('/base-boolean-fields/')
      .then(response => {
        commit('SET_BASE_BOOLEAN_FIELDS', response.data)
      })
  },
  async createBaseBooleanField ({ commit }, field) {
    await axios.post('/base-boolean-fields/', field)
      .then(response => {
        commit('ADD_BASE_BOOLEAN_FIELD', response.data)
        commit('SET_BASE_FIELDS')
      })
  }
}

const mutations = {
  ADD_BASE_BOOLEAN_FIELD: (state, field) => state.base_boolean_fields.unshift(field),
  SET_BASE_BOOLEAN_FIELDS: (state, fields) => (state.base_boolean_fields = fields)
}

export default {
  state,
  // getters,
  actions,
  mutations
}
