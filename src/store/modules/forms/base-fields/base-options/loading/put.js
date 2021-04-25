
const state = {
  base_options_put_loading: false
}

const getters = {
  getBaseOptionsPutLoading: state => state.base_options_put_loading
}

const mutations = {
  SET_BASE_OPTIONS_PUT_LOADING: (state) => (state.base_options_put_loading = true),
  RESET_BASE_OPTIONS_PUT_LOADING: (state) => (state.base_options_put_loading = false)
}

export default {
  state,
  getters,
  mutations
}
