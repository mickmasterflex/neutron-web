import axios from '@/axios'
import fields from '@/store/modules/forms/fields'
import baseFields from '@/store/modules/forms/base-fields'
import loading from '@/store/modules/forms/loading'
import injected from '@/store/modules/forms/injected'
import additionalContent from '@/store/modules/forms/additional-content'

const modules = {
  baseFields,
  fields,
  injected,
  loading,
  additionalContent
}

const state = {
  current_form: {},
  all_forms: [],
  current_ancestor_forms: []
}

const getters = {
  getCurrentForm: state => state.current_form,
  getFormByBuyerContract: state => contract => state.all_forms.find(form => form.buyer_contract === contract),
  getFormById: state => formId => state.all_forms.find(form => form.id === formId),
  getAllForms: state => state.all_forms,
  getAncestorFormsWithAdditionalContent: state => state.current_ancestor_forms.filter(form => form.additional_form_content_tcpa.length > 0),
  getAncestorFormsWithFields: state => state.current_ancestor_forms.filter(form => form.fields.length > 0),
  getAncestorFormsWithInjectedFields: state => state.current_ancestor_forms.filter(form => form.injected_fields.length > 0)
}

const actions = {
  async fetchForms ({ commit, dispatch, getters }) {
    commit('SET_FETCH_FORMS_LOADING')
    await axios.get('/forms/')
      .then(response => {
        commit('SET_ALL_FORMS', response.data)
        dispatch('setAncestorForms', getters.getCurrentAncestorsIds)
      })
      .finally(() => {
        commit('RESET_FETCH_FORMS_LOADING')
      })
  },
  async setAncestorForms ({ getters, commit }, ancestors) {
    ancestors.forEach(ancestor => {
      const ancestorForm = getters.getFormByBuyerContract(ancestor)
      if (ancestorForm.fields.length > 0) {
        commit('ADD_ANCESTOR_FORM', ancestorForm)
      }
    })
  }
}

const mutations = {
  SET_CURRENT_FORM: (state, form) => (state.current_form = form),
  SORT_CURRENT_FORM_FIELDS: (state) => (state.current_form.fields = state.current_form.fields.sort((a, b) => (a.order > b.order) ? 1 : -1)),
  ADD_FIELD: (state, field) => state.current_form[field.type].push(field.data),
  REMOVE_FIELD: (state, deletedField) => (state.current_form[deletedField.type] = state.current_form[deletedField.type].filter(field => field.id !== deletedField.id)),
  UPDATE_FIELD: (state, updatedField) => {
    const index = state.current_form[updatedField.type].findIndex(field => field.id === updatedField.data.id)
    if (index !== -1) {
      state.current_form[updatedField.type].splice(index, 1, updatedField.data)
    }
  },
  SET_ALL_FORMS: (state, forms) => (state.all_forms = forms),
  ADD_ANCESTOR_FORM: (state, form) => (state.current_ancestor_forms.push(form)),
  RESET_ANCESTOR_FORMS: (state) => (state.current_ancestor_forms = [])
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
