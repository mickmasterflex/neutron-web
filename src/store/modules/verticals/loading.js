const state = {
  verticals_loading: false,
  verticals_fetch_loading: false
}

const getters = {
  getVerticalsFetchLoading: state => state.verticals_fetch_loading
}

const mutations = {
  SET_VERTICALS_FETCH_LOADING: (state) => (state.verticals_fetch_loading = true),
  RESET_VERTICALS_FETCH_LOADING: (state) => (state.verticals_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
