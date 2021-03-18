const state = {
  buyer_client_stats_fetch_loading_text: 'Loading Buyer Contracts Data'
}

const actions = {
  async fetchBuyerClientStats ({ dispatch }, id) {
    dispatch('fetchClientStats', `/analytics/buyer-contracts/?client=${id}`)
  },
  async fetchBuyerClientLeadsCSV ({ dispatch }, id) {
    dispatch('fetchAnalyticsCSV', {
      filename: 'buyerClient-' + id,
      url: `/analytics/buyer-contracts/?client=${id}`
    })
  }
}

export default {
  state,
  actions
}
