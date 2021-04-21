import baseBooleanFields from '@/store/modules/forms/base-fields/base-boolean-fields'
import baseTextFields from '@/store/modules/forms/base-fields/base-text-fields'
import baseOptionFields from '@/store/modules/forms/base-fields/base-option-fields'
import loading from '@/store/modules/forms/base-fields/loading'
import visibility from '@/store/modules/forms/base-fields/visibility'

const modules = {
  baseBooleanFields,
  baseTextFields,
  baseOptionFields,
  loading,
  visibility
}

const state = {
  base_fields: [],
  available_base_fields: [],
  current_base_field: null
}

const getters = {
  getBaseFields: state => state.base_fields,
  getAvailableBaseFields: state => state.available_base_fields,
  getBaseFieldCount: state => state.base_fields.length,
  getCurrentBaseField: state => state.current_base_field
}

const actions = {
  async fetchBaseFields ({ commit, dispatch }) {
    commit('SET_BASE_FIELDS_FETCH_LOADING')
    await dispatch('fetchBaseTextFields')
    await dispatch('fetchBaseOptionFields')
    commit('SET_BASE_FIELDS')
    commit('RESET_BASE_FIELDS_FETCH_LOADING')
  }
}

const mutations = {
  SET_BASE_FIELDS: (state) => (state.base_fields = state.baseTextFields.base_text_fields.concat(state.baseOptionFields.base_option_fields).concat(state.baseBooleanFields.base_boolean_fields)),
  SET_AVAILABLE_BASE_FIELDS: (state, fields) => {
    if (fields) {
      state.available_base_fields = [...state.base_fields]
      fields.forEach(field => {
        const index = state.available_base_fields.findIndex(baseField => baseField.id === field.base_field)
        if (index !== -1) {
          state.available_base_fields.splice(index, 1)
        }
      })
    } else {
      const error = new Error('fields Array was not provided in the payload')
      window.console.log(error)
    }
  },
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
