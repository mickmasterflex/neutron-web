import axios from '@/axios'

const state = {
  base_option_fields: [],
  current_base_option_field: {}
}

const getters = {
  getBaseOptionFields: state => state.base_option_fields,
  getCurrentBaseOptionField: state => state.current_base_option_field
}

const actions = {
  async fetchBaseOptionFields ({ commit }) {
    await axios.get('/base-option-fields/')
      .then(response => {
        commit('SET_BASE_OPTION_FIELDS', response.data)
      })
  },
  async fetchCurrentBaseOptionField ({ commit }, id) {
    await axios.get(`/base-option-fields/${id}/`)
      .then(response => {
        commit('SET_CURRENT_BASE_OPTION_FIELD', response.data)
      })
  },
  async createBaseOptionField ({ commit }, field) {
    await axios.post('/base-option-fields/', field)
      .then(response => {
        commit('ADD_BASE_OPTION_FIELD', response.data)
      })
  },
  async updateBaseOptionField ({ commit }, updatedField) {
    await axios.put(`/base-option-fields/${updatedField.id}/`, updatedField)
      .then(() => {
        commit('UPDATE_BASE_OPTION_FIELD', updatedField)
      })
  },
  async deleteBaseOptionField ({ commit }, id) {
    await axios.delete(`/base-option-fields/${id}/`)
      .then(() => {
        commit('REMOVE_BASE_OPTION_FIELD', id)
      })
  }
}

const mutations = {
  SET_BASE_OPTION_FIELDS: (state, fields) => (state.base_option_fields = fields),
  SET_CURRENT_BASE_OPTION_FIELD: (state, field) => (state.current_base_option_field = field),
  RESET_CURRENT_BASE_OPTION_FIELD: (state) => { state.current_base_option_field = {} },
  ADD_BASE_OPTION_FIELD: (state, field) => state.base_option_fields.unshift(field),
  UPDATE_BASE_OPTION_FIELD: (state, updatedField) => {
    const index = state.base_option_fields.findIndex(field => field.id === updatedField.id)
    if (index !== -1) {
      state.base_option_fields.splice(index, 1, updatedField)
    }
  },
  REMOVE_BASE_OPTION_FIELD: (state, id) => (state.base_option_fields = state.base_option_fields.filter(field => field.id !== id))
}

export default {
  state,
  getters,
  actions,
  mutations
}
