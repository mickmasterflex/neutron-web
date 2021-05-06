
const state = {
  injected_field_types_put_loading: false
}

const getters = {
  getInjectedFieldTypesPutLoading: state => state.injected_field_types_put_loading
}

const mutations = {
  SET_INJECTED_FIELD_TYPES_PUT_LOADING: (state) => (state.injected_field_types_put_loading = true),
  RESET_INJECTED_FIELD_TYPES_PUT_LOADING: (state) => (state.injected_field_types_put_loading = false)
}

export default {
  state,
  getters,
  mutations
}
