
const state = {
  injected_fields_post_loading: false
}

const getters = {
  getInjectedFieldsPostLoading: state => state.injected_fields_post_loading
}

const mutations = {
  SET_INJECTED_FIELDS_POST_LOADING: (state) => (state.injected_fields_post_loading = true),
  RESET_INJECTED_FIELDS_POST_LOADING: (state) => (state.injected_fields_post_loading = false)
}

export default {
  state,
  getters,
  mutations
}
