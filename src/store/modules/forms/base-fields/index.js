import baseBooleanFields from '@/store/modules/forms/base-fields/base-boolean-fields.js'
import baseTextFields from '@/store/modules/forms/base-fields/base-text-fields.js'
import baseOptionFields from '@/store/modules/forms/base-fields/base-option-fields.js'
import baseOptions from '@/store/modules/forms/base-fields/base-options.js'
import loading from '@/store/modules/forms/base-fields/loading'
import usedBaseFields from '@/store/modules/forms/base-fields/used-base-fields'
import visibility from '@/store/modules/forms/base-fields/visibility'

const modules = {
  baseBooleanFields,
  baseTextFields,
  baseOptionFields,
  baseOptions,
  loading,
  usedBaseFields,
  visibility
}

const state = {
  base_fields: [],
  current_base_field: null
}

const getters = {
  getBaseFields: state => state.base_fields,
  getBaseFieldCount: state => state.base_fields.length,
  getCurrentBaseField: state => state.current_base_field
}

const actions = {
  async fetchBaseFields ({ commit, dispatch }) {
    commit('SET_BASE_FIELDS_FETCH_LOADING')
    await dispatch('fetchBaseBooleanFields')
    await dispatch('fetchBaseTextFields')
    await dispatch('fetchBaseOptionFields')
    commit('SET_BASE_FIELDS')
    commit('RESET_BASE_FIELDS_FETCH_LOADING')
  }
}

const mutations = {
  SET_BASE_FIELDS: (state) => (state.base_fields = state.baseTextFields.base_text_fields.concat(state.baseOptionFields.base_option_fields).concat(state.baseBooleanFields.base_boolean_fields)),
  SET_CURRENT_BASE_FIELD: (state, field) => (state.current_base_field = field),
  RESET_CURRENT_BASE_FIELD: (state) => (state.current_base_field = null)
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
