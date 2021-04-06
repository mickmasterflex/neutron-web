
const state = {
  reasons_fetch_loading: false
}

const getters = {
  getReasonsFetchLoading: state => state.reasons_fetch_loading
}

const mutations = {
  SET_REASONS_FETCH_LOADING: (state) => (state.reasons_fetch_loading = true),
  RESET_REASONS_FETCH_LOADING: (state) => (state.reasons_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
