
const state = {
  base_fields_put_loading: false
}

const getters = {
  getBaseFieldsPutLoading: state => state.base_fields_put_loading
}

const mutations = {
  SET_BASE_FIELDS_PUT_LOADING: (state) => (state.base_fields_put_loading = true),
  RESET_BASE_FIELDS_PUT_LOADING: (state) => (state.base_fields_put_loading = false)
}

export default {
  state,
  getters,
  mutations
}
