
const state = {
  buyer_contracts_fetch_loading: false,
  buyer_contracts_fetch_loading_text: 'Loading Buyer_contracts Data'
}

const getters = {
  getBuyerContractsFetchLoading: state => state.buyer_contracts_fetch_loading,
  getBuyerContractsFetchLoadingText: state => state.buyer_contracts_fetch_loading_text
}

const mutations = {
  SET_BUYER_CONTRACTS_FETCH_LOADING: (state) => (state.buyer_contracts_fetch_loading = true),
  RESET_BUYER_CONTRACTS_FETCH_LOADING: (state) => (state.buyer_contracts_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
