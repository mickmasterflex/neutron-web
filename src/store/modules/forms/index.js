import axios from '@/axios'
import fpi from '@/store/modules/forms/fpi'
import fields from '@/store/modules/forms/fields'
import baseFields from '@/store/modules/forms/base-fields'
import loading from '@/store/modules/forms/loading'
import injected from '@/store/modules/forms/injected'
import additionalContent from '@/store/modules/forms/additional-content'

const modules = {
  fpi,
  baseFields,
  fields,
  injected,
  loading,
  additionalContent
}

const state = {
  all_forms: [],
  current_ancestor_forms: []
}

const getters = {
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
