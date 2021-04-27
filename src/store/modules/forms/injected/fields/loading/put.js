
const state = {
  injected_fields_put_loading: false
}

const getters = {
  getInjectedFieldsPutLoading: state => state.injected_fields_put_loading
}

const mutations = {
  SET_INJECTED_FIELDS_PUT_LOADING: (state) => (state.injected_fields_put_loading = true),
  RESET_INJECTED_FIELDS_PUT_LOADING: (state) => (state.injected_fields_put_loading = false)
}

export default {
  state,
  getters,
  mutations
}
