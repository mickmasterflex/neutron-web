import textFields from '@/store/modules/forms/fields/text-fields'
import optionFields from '@/store/modules/forms/fields/option-fields'

const modules = {
  textFields,
  optionFields
}

const state = {
  current_field: null,
  show_create_field: false
}

const getters = {
  getCurrentField: state => state.current_field,
  getShowCreateField: state => state.show_create_field
}

const mutations = {
  SET_CURRENT_FIELD: (state, field) => (state.current_field = field),
  RESET_CURRENT_FIELD: (state) => (state.current_field = null),
  TOGGLE_SHOW_CREATE_FIELD: (state, bool) => (state.show_create_field = bool)
}

export default {
  modules,
  state,
  getters,
  mutations
}
