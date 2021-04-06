
const state = {
  reasons_fetch_loading: false,
  reasons_fetch_loading_text: 'Loading Reasons'
}

const getters = {
  getReasonsFetchLoading: state => state.reasons_fetch_loading,
  getReasonsFetchLoadingText: state => state.reasons_fetch_loading_text
}

const mutations = {
  SET_REASONS_FETCH_LOADING: (state) => (state.reasons_fetch_loading = true),
  RESET_REASONS_FETCH_LOADING: (state) => (state.reasons_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
