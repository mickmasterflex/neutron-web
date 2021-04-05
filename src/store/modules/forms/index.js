import fields from '@/store/modules/forms/fields'
import baseFields from '@/store/modules/forms/base-fields'
import loading from '@/store/modules/forms/loading'
import axios from '@/axios'

const modules = {
  baseFields,
  fields,
  loading
}

const state = {
  all_forms: [],
  current_ancestor_forms: []
}

const getters = {
  getFormByBuyerContract: state => contract => state.all_forms.find(form => form.buyer_contract === contract),
  getAncestorForms: state => state.current_ancestor_forms
}

const actions = {
  async fetchForms ({ commit, dispatch, getters }) {
    commit('SET_FETCH_FORMS_LOADING')
    await axios.get('/forms/')
      .then(response => {
        commit('SET_ALL_FORMS', response.data)
        dispatch('setAncestorForms', getters.getCurrentContractAncestorsIds)
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
