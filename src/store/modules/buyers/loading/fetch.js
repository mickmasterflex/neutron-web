
const state = {
  buyer_fetch_loading: false,
  buyers_fetch_loading: false,
  buyer_fetch_loading_text: 'Loading Buyer Data',
  buyers_fetch_loading_text: 'Loading Buyers'
}

const getters = {
  getBuyerFetchLoading: state => state.buyer_fetch_loading,
  getBuyersFetchLoading: state => state.buyers_fetch_loading,
  getBuyerFetchLoadingText: state => state.buyer_fetch_loading_text,
  getBuyersFetchLoadingText: state => state.buyers_fetch_loading_text
}

const mutations = {
  SET_BUYERS_FETCH_LOADING: (state) => (state.buyers_fetch_loading = true),
  RESET_BUYERS_FETCH_LOADING: (state) => (state.buyers_fetch_loading = false),
  SET_BUYER_FETCH_LOADING: (state) => (state.buyer_fetch_loading = true),
  RESET_BUYER_FETCH_LOADING: (state) => (state.buyer_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
