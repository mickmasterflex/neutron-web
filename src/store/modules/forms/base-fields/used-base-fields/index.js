import axios from '@/axios'
import loading from './loading'
import panels from './panels'

const modules = {
  loading,
  panels
}

const state = {
  used_base_fields: [],
  used_base_fields_forms: []
}

const getters = {
  getUsedBaseFields: state => state.used_base_fields,
  getAvailableBaseFields: (state, getters) => getters.getBaseFields.filter(field => !getters.getUsedBaseFields.includes(field.id)),
  getUsedBaseFieldFormsByUsedField: (state) => (id) => state.used_base_fields_forms.filter(form => form.used_fields.includes(id))
}

const actions = {
  async fetchUsedBaseFields ({ commit, dispatch }, formId) {
    commit('RESET_USED_BASE_FIELDS')
    commit('RESET_USED_BASE_FIELDS_FORMS')
    commit('SET_FETCH_USED_BASE_FIELDS_LOADING')
    await axios.get(`/used-base-fields/?form=${formId}`)
      .then(response => {
        dispatch('setUsedBaseFields', response.data)
        commit('SET_USED_BASE_FIELDS_FORMS', response.data)
      }).finally(() => {
        commit('RESET_FETCH_USED_BASE_FIELDS_LOADING')
      })
  },
  async setUsedBaseFields ({ commit }, forms) {
    forms.forEach(form => {
      commit('ADD_USED_BASE_FIELDS', form.used_fields)
    })
  }
}

const mutations = {
  SET_USED_BASE_FIELDS_FORMS: (state, forms) => (state.used_base_fields_forms = forms),
  RESET_USED_BASE_FIELDS_FORMS: (state, forms) => (state.used_base_fields_forms = forms),
  ADD_USED_BASE_FIELDS: (state, fields) => {
    const usedBaseFields = state.used_base_fields.concat(fields)
    state.used_base_fields = [...new Set(usedBaseFields)]
  },
  ADD_USED_BASE_FIELD: (state, fieldId) => (state.used_base_fields = [fieldId, ...state.used_base_fields]),
  REMOVE_USED_BASE_FIELD: (state, fieldId) => (state.used_base_fields = state.used_base_fields.filter(field => field !== fieldId)),
  RESET_USED_BASE_FIELDS: (state) => (state.used_base_fields = [])
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
