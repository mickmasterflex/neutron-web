
const state = {
  buyers_fetch_loading: false
}

const getters = {
  getBuyersFetchLoading: state => state.buyers_fetch_loading
}

const mutations = {
  SET_BUYERS_FETCH_LOADING: (state) => (state.buyers_fetch_loading = true),
  RESET_BUYERS_FETCH_LOADING: (state) => (state.buyers_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
