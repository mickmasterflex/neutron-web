const state = {
  current_buyer_stats_offer: {}
}

const getters = {
  getCurrentBuyerStatsOffer: state => state.current_buyer_stats_offer
}

const actions = {}

const mutations = {
  SET_CURRENT_BUYER_STATS_OFFER: (state, offer) => (state.current_buyer_stats_offer = offer)
}

export default {
  state,
  getters,
  actions,
  mutations
}
