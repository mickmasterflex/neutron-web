
const state = {
  buyer_stats_offers_fetch_loading: false,
  buyer_stats_offers_fetch_loading_text: 'Loading Buyer Offers Data'
}

const getters = {
  getBuyerStatsOffersFetchLoading: state => state.buyer_stats_offers_fetch_loading,
  getBuyerStatsOffersFetchLoadingText: state => state.buyer_stats_offers_fetch_loading_text
}

const mutations = {
  SET_BUYER_STATS_OFFERS_FETCH_LOADING: (state) => (state.buyer_stats_offers_fetch_loading = true),
  RESET_BUYER_STATS_OFFERS_FETCH_LOADING: (state) => (state.buyer_stats_offers_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
