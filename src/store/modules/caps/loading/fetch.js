
const state = {
  caps_fetch_loading: false,
  caps_fetch_loading_text: 'Loading Caps Calendar'
}

const getters = {
  getCapsFetchLoading: state => state.caps_fetch_loading,
  getCapsFetchLoadingText: state => state.caps_fetch_loading_text
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
