
const state = {
  buyer_stats_clients_fetch_loading: false,
  buyer_stats_clients_fetch_loading_text: 'Loading Buyer Clients Data'
}

const getters = {
  getBuyerStatsClientsFetchLoading: state => state.buyer_stats_clients_fetch_loading,
  getBuyerStatsClientsFetchLoadingText: state => state.buyer_stats_clients_fetch_loading_text
}

const mutations = {
  SET_BUYER_STATS_CLIENTS_FETCH_LOADING: (state) => (state.buyer_stats_clients_fetch_loading = true),
  RESET_BUYER_STATS_CLIENTS_FETCH_LOADING: (state) => (state.buyer_stats_clients_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
