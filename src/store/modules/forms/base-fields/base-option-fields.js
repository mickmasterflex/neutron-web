import axios from '@/axios'

const state = {
  base_option_fields: []
}

const getters = {
  getBaseOptionFieldById: (state) => (id) => state.base_option_fields.find(field => field.id === id)
}

const actions = {
  async fetchBaseOptionFields ({ commit }) {
    await axios.get('/base-option-fields/')
      .then(response => {
        commit('SET_BASE_OPTION_FIELDS', response.data)
      })
  },
  async createBaseOptionField ({ commit }, field) {
    commit('SET_BASE_FIELDS_POST_LOADING')
    await axios.post('/base-option-fields/', field)
      .then(response => {
        commit('ADD_BASE_OPTION_FIELD', response.data)
        commit('SET_BASE_FIELDS')
        commit('SET_CURRENT_BASE_OPTIONS_FIELD_ID', response.data.id)
      }).finally(() => {
        commit('RESET_BASE_FIELDS_POST_LOADING')
      })
  },
  async updateBaseOptionField ({ commit }, updatedField) {
    commit('SET_BASE_FIELDS_PUT_LOADING')
    await axios.put(`/base-option-fields/${updatedField.id}/`, updatedField)
      .then(response => {
        commit('UPDATE_BASE_OPTION_FIELD', response.data)
        commit('SET_BASE_FIELDS')
      }).finally(() => {
        commit('RESET_BASE_FIELDS_PUT_LOADING')
      })
  },
  async deleteBaseOptionField ({ commit }, id) {
    await axios.delete(`/base-option-fields/${id}/`)
      .then(() => {
        commit('REMOVE_BASE_OPTION_FIELD', id)
        commit('SET_BASE_FIELDS')
      })
  }
}

const mutations = {
  SET_BASE_OPTION_FIELDS: (state, fields) => (state.base_option_fields = fields),
  ADD_BASE_OPTION_FIELD: (state, field) => state.base_option_fields.unshift(field),
  UPDATE_BASE_OPTION_FIELD: (state, updatedField) => {
    const index = state.base_option_fields.findIndex(field => field.id === updatedField.id)
    if (index !== -1) {
      state.base_option_fields.splice(index, 1, updatedField)
    }
  },
  REMOVE_BASE_OPTION_FIELD: (state, id) => (state.base_option_fields = state.base_option_fields.filter(field => field.id !== id)),
  UPDATE_BASE_OPTION_FIELD_OPTION: (state, option) => {
    const field = state.base_option_fields.find(f => f.id === option.field)
    const index = field.base_options.findIndex(o => o.id === option.id)
    if (index !== -1) {
      field.base_options.splice(index, 1, option)
    }
  },
  ADD_BASE_OPTION_FIELD_OPTION: (state, option) => {
    const field = state.base_option_fields.find(f => f.id === option.field)
    const index = field.base_options.findIndex(o => o.id === option.id)
    if (index === -1) {
      field.base_options.push(option)
    }
  },
  REMOVE_BASE_OPTION_FIELD_OPTION: (state, option) => {
    const field = state.base_option_fields.find(f => f.id === option.field)
    field.base_options = field.base_options.filter(o => o.id !== option.id)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
