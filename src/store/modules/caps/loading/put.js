
const state = {
  caps_put_loading: false
}

const getters = {
  getCapsPutLoading: state => state.caps_put_loading
}

const mutations = {
  SET_CAPS_PUT_LOADING: (state) => (state.caps_put_loading = true),
  RESET_CAPS_PUT_LOADING: (state) => (state.caps_put_loading = false)
}

export default {
  state,
  getters,
  mutations
}
