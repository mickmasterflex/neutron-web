const state = {
  fetch_used_base_fields_loading: false
}

const getters = {
  getFetchUsedBaseFieldsLoading: state => state.fetch_used_base_fields_loading
}

const mutations = {
  SET_FETCH_USED_BASE_FIELDS_LOADING: state => (state.fetch_used_base_fields_loading = true),
  RESET_FETCH_USED_BASE_FIELDS_LOADING: state => (state.fetch_used_base_fields_loading = false)
}

export default {
  state,
  getters,
  mutations
}
