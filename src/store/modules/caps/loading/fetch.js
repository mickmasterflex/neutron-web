
const state = {
  caps_fetch_loading: false
}

const getters = {
  getCapsFetchLoading: state => state.caps_fetch_loading
}

const mutations = {
  SET_CAPS_FETCH_LOADING: (state) => (state.caps_fetch_loading = true),
  RESET_CAPS_FETCH_LOADING: (state) => (state.caps_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
