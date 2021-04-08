
const state = {
  reasons_put_loading: false,
  reasons_put_loading_text: 'Updating Reason'
}

const getters = {
  getReasonsPutLoading: state => state.reasons_put_loading,
  getReasonsPutLoadingText: state => state.reasons_put_loading_text
}

const mutations = {
  SET_REASONS_PUT_LOADING: (state) => (state.reasons_put_loading = true),
  RESET_REASONS_PUT_LOADING: (state) => (state.reasons_put_loading = false)
}

export default {
  state,
  getters,
  mutations
}
