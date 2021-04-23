import textFields from '@/store/modules/forms/fields/text-fields'
import optionFields from '@/store/modules/forms/fields/option-fields'
import booleanFields from '@/store/modules/forms/fields/boolean-fields'
import visibility from '@/store/modules/forms/fields/visibility'

const modules = {
  booleanFields,
  textFields,
  optionFields,
  visibility
}

const state = {
  current_form: {},
  current_field: null
}

const getters = {
  getCurrentForm: state => state.current_form,
  getCurrentField: state => state.current_field
}

const mutations = {
  SET_CURRENT_FORM: (state, form) => (state.current_form = form),
  SORT_CURRENT_FORM_FIELDS: (state) => (state.current_form.fields = state.current_form.fields.sort((a, b) => (a.order > b.order) ? 1 : -1)),
  ADD_FIELD: (state, field) => state.current_form[field.type].push(field.data),
  UPDATE_FIELD: (state, updatedField) => {
    const index = state.current_form[updatedField.type].findIndex(field => field.id === updatedField.data.id)
    if (index !== -1) {
      state.current_form[updatedField.type].splice(index, 1, updatedField.data)
    }
  },
  REMOVE_FIELD: (state, deletedField) => (state.current_form[deletedField.type] = state.current_form[deletedField.type].filter(field => field.id !== deletedField.id)),
  SET_CURRENT_FIELD: (state, field) => (state.current_field = field),
  RESET_CURRENT_FIELD: (state) => (state.current_field = null)
}

export default {
  modules,
  state,
  getters,
  mutations
}
