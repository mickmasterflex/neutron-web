
const state = {
  reasons_post_loading: false,
  reasons_post_loading_text: 'Creating Reason'
}

const getters = {
  getReasonsPostLoading: state => state.reasons_post_loading,
  getReasonsPostLoadingText: state => state.reasons_post_loading_text
}

const mutations = {
  SET_REASONS_POST_LOADING: (state) => (state.reasons_post_loading = true),
  RESET_REASONS_POST_LOADING: (state) => (state.reasons_post_loading = false)
}

export default {
  state,
  getters,
  mutations
}
