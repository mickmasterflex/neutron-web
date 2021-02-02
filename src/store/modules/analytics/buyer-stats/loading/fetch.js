
const state = {
  buyer_stats_fetch_loading: false,
  buyer_stats_fetch_loading_text: 'Loading'
}

const getters = {
  getBuyerStatsFetchLoading: state => state.buyer_stats_fetch_loading,
  getBuyerStatsFetchLoadingText: state => state.buyer_stats_fetch_loading_text
}

const mutations = {
  SET_BUYER_STATS_FETCH_LOADING: (state) => (state.buyer_stats_fetch_loading = true),
  RESET_BUYER_STATS_FETCH_LOADING: (state) => (state.buyer_stats_fetch_loading = false),
  SET_BUYER_STATS_FETCH_LOADING_TEXT: (state, text) => (state.buyer_stats_fetch_loading_text = text)
}

export default {
  state,
  getters,
  mutations
}
