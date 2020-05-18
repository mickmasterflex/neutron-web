import textFields from '@/store/modules/forms/fields/text-fields'
import optionFields from '@/store/modules/forms/fields/option-fields'

const modules = {
  textFields,
  optionFields
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
