
const state = {
  injected_field_types_post_loading: false
}

const getters = {
  getInjectedFieldTypesPostLoading: state => state.injected_field_types_post_loading
}

const mutations = {
  SET_INJECTED_FIELD_TYPES_POST_LOADING: (state) => (state.injected_field_types_post_loading = true),
  RESET_INJECTED_FIELD_TYPES_POST_LOADING: (state) => (state.injected_field_types_post_loading = false)
}

export default {
  state,
  getters,
  mutations
}
