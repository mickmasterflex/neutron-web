import fields from '@/store/modules/forms/fields'
import baseFields from '@/store/modules/forms/base-fields'

const modules = {
  baseFields,
  fields
}
const state = {
  current_form: []
}
const getters = {
  getCurrentForm: state => state.current_form
}

const mutations = {
  SET_CURRENT_FORM: (state, form) => (state.current_form = form),
  ADD_FIELD: (state, field) => state.current_form.fields.unshift(field),
  UPDATE_FIELD: (state, updatedField) => {
    const index = state.current_form.fields.findIndex(field => field.id === updatedField.id)
    if (index !== -1) {
      state.current_form.fields.splice(index, 1, updatedField)
    }
  },
  REMOVE_FIELD: (state, id) => (state.current_form.fields = state.current_form.fields.filter(field => field.id !== id))
}

export default {
  modules,
  state,
  getters,
  mutations
}
