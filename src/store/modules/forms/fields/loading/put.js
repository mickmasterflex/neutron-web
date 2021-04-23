
const state = {
  fields_put_loading: false
}

const getters = {
  getFieldsPutLoading: state => state.fields_put_loading
}

const mutations = {
  SET_FIELDS_PUT_LOADING: (state) => (state.fields_put_loading = true),
  RESET_FIELDS_PUT_LOADING: (state) => (state.fields_put_loading = false)
}

export default {
  state,
  getters,
  mutations
}
