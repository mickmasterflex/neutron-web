import textFields from '@/store/modules/forms/fields/text-fields'
import optionFields from '@/store/modules/forms/fields/option-fields'

const modules = {
  textFields,
  optionFields
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
  ADD_FIELD: (state, field) => state.current_form.fields.push(field),
  UPDATE_FIELD: (state, updatedField) => {
    const index = state.current_form.fields.findIndex(field => field.id === updatedField.id)
    if (index !== -1) {
      state.current_form.fields.splice(index, 1, updatedField)
    }
  },
  REMOVE_FIELD: (state, id) => (state.current_form.fields = state.current_form.fields.filter(field => field.id !== id)),
  SET_CURRENT_FIELD: (state, field) => (state.current_field = field),
  RESET_CURRENT_FIELD: (state) => (state.current_field = null)
}

export default {
  modules,
  state,
  getters,
  mutations
}
