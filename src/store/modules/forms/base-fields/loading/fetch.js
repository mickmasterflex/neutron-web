
const state = {
  base_fields_fetch_loading: false,
  base_fields_fetch_loading_text: 'Loading Base Fields'
}

const getters = {
  getBaseFieldsFetchLoading: state => state.base_fields_fetch_loading,
  getBaseFieldsFetchLoadingText: state => state.base_fields_fetch_loading_text
}

const mutations = {
  SET_BASE_FIELDS_FETCH_LOADING: (state) => (state.base_fields_fetch_loading = true),
  RESET_BASE_FIELDS_FETCH_LOADING: (state) => (state.base_fields_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
