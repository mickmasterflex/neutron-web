
const state = {
  buyer_client_stats_fetch_loading: false,
  buyer_client_stats_fetch_loading_text: 'Loading Buyer Contracts Data'
}

const getters = {
  getBuyerClientStatsFetchLoading: state => state.buyer_client_stats_fetch_loading,
  getBuyerClientStatsFetchLoadingText: state => state.buyer_client_stats_fetch_loading_text
}

const mutations = {
  SET_BUYER_CLIENT_STATS_FETCH_LOADING: (state) => (state.buyer_client_stats_fetch_loading = true),
  RESET_BUYER_CLIENT_STATS_FETCH_LOADING: (state) => (state.buyer_client_stats_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
