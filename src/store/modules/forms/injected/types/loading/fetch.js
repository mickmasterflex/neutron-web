
const state = {
  injected_field_types_fetch_loading: false,
  injected_field_types_fetch_loading_text: 'Loading Injected Field Types'
}

const getters = {
  getInjectedFieldTypesFetchLoading: state => state.injected_field_types_fetch_loading,
  getInjectedFieldTypesFetchLoadingText: state => state.injected_field_types_fetch_loading_text
}

const mutations = {
  SET_INJECTED_FIELD_TYPES_FETCH_LOADING: (state) => (state.injected_field_types_fetch_loading = true),
  RESET_INJECTED_FIELD_TYPES_FETCH_LOADING: (state) => (state.injected_field_types_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
