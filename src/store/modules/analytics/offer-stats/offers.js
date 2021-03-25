const state = {
  current_stats_offers: []
}

const getters = {
  getCurrentStatsOffersByParent: (state) => (buyerId) => {
    return state.current_stats_offers.filter(offer => {
      if (offer.parent) {
        return offer.parent.id === buyerId
      }
    })
  }
}

const mutations = {
  SET_CURRENT_STATS_OFFERS: (state, offers) => (state.current_stats_offers = offers)
}

export default {
  state,
  getters,
  mutations
}
