const state = {
  fetchFormsLoading: false,
  fetchFormsLoadingText: 'Loading Form Fields'
}

const getters = {
  getFetchFormsLoading: state => state.fetchFormsLoading,
  getFetchFormsLoadingText: state => state.fetchFormsLoadingText
}

const mutations = {
  SET_FETCH_FORMS_LOADING: state => (state.fetchFormsLoading = true),
  RESET_FETCH_FORMS_LOADING: state => (state.fetchFormsLoading = false)
}

export default {
  state,
  getters,
  mutations
}
