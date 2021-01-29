
const state = {
  buyer_stats_contracts_fetch_loading: false,
  buyer_stats_contracts_fetch_loading_text: 'Loading Buyer Contracts Data'
}

const getters = {
  getBuyerStatsContractsFetchLoading: state => state.buyer_stats_contracts_fetch_loading,
  getBuyerStatsContractsFetchLoadingText: state => state.buyer_stats_contracts_fetch_loading_text
}

const mutations = {
  SET_BUYER_STATS_CONTRACTS_FETCH_LOADING: (state) => (state.buyer_stats_contracts_fetch_loading = true),
  RESET_BUYER_STATS_CONTRACTS_FETCH_LOADING: (state) => (state.buyer_stats_contracts_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
