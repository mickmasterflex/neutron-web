import fields from '@/store/modules/forms/fields'
import baseFields from '@/store/modules/forms/base-fields'
import axios from '@/axios'

const modules = {
  baseFields,
  fields
}

const state = {
  all_forms: []
}

const getters = {
  getAllForms: state => state.all_forms,
  getAllFormsTest: state => state.all_forms[0] ? state.all_forms[0].fields[0] : null,
  getFormByContract: state => contract => state.all_forms.filter(form => form.contract === contract)
}

const actions = {
  async fetchForms ({ commit }) {
    await axios.get('/forms/')
      .then(response => {
        commit('SET_ALL_FORMS', response.data)
      })
  }
}

const mutations = {
  SET_ALL_FORMS: (state, forms) => (state.all_forms = forms)
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
