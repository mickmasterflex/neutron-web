
const state = {
  buyer_clients_fetch_loading: false,
  buyer_clients_fetch_loading_text: 'Loading Buyer_clients Data'
}

const getters = {
  getBuyerClientsFetchLoading: state => state.buyer_clients_fetch_loading,
  getBuyerClientsFetchLoadingText: state => state.buyer_clients_fetch_loading_text
}

const mutations = {
  SET_BUYER_CLIENTS_FETCH_LOADING: (state) => (state.buyer_clients_fetch_loading = true),
  RESET_BUYER_CLIENTS_FETCH_LOADING: (state) => (state.buyer_clients_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
