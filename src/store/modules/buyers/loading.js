
const state = {
  buyers_fetch_loading: false,
  buyers_fetch_loading_text: 'Loading Buyers'
}

const getters = {
  getBuyersFetchLoading: state => state.buyers_fetch_loading,
  getBuyersFetchLoadingText: state => state.buyers_fetch_loading_text
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
