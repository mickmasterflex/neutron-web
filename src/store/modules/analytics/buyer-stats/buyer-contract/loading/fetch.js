
const state = {
  buyer_contract_stats_fetch_loading: false,
  buyer_contract_stats_fetch_loading_text: 'Loading Buyer Contract Data'
}

const getters = {
  getBuyerContractStatsFetchLoading: state => state.buyer_contract_stats_fetch_loading,
  getBuyerContractStatsFetchLoadingText: state => state.buyer_contract_stats_fetch_loading_text
}

const mutations = {
  SET_BUYER_CONTRACT_STATS_FETCH_LOADING: (state) => (state.buyer_contract_stats_fetch_loading = true),
  RESET_BUYER_CONTRACT_STATS_FETCH_LOADING: (state) => (state.buyer_contract_stats_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
