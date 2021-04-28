import textFields from '@/store/modules/forms/fields/text-fields.js'
import optionFields from '@/store/modules/forms/fields/option-fields'
import booleanFields from '@/store/modules/forms/fields/boolean-fields.js'
import visibility from '@/store/modules/forms/fields/visibility'
import loading from '@/store/modules/forms/fields/loading'

const modules = {
  booleanFields,
  textFields,
  optionFields,
  loading,
  visibility
}

const state = {
  current_field: null
}

const getters = {
  getCurrentField: state => state.current_field
}

const mutations = {
  SET_CURRENT_FIELD: (state, field) => (state.current_field = field),
  RESET_CURRENT_FIELD: (state) => (state.current_field = null)
}

export default {
  modules,
  state,
  getters,
  mutations
}
