
const state = {
  base_options_post_loading: false
}

const getters = {
  getBaseOptionsPostLoading: state => state.base_options_post_loading
}

const mutations = {
  SET_BASE_OPTIONS_POST_LOADING: (state) => (state.base_options_post_loading = true),
  RESET_BASE_OPTIONS_POST_LOADING: (state) => (state.base_options_post_loading = false)
}

export default {
  state,
  getters,
  mutations
}
