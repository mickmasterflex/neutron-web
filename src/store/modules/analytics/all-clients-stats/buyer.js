
const actions = {
  async fetchBuyerClientsStats ({ dispatch }) {
    dispatch('fetchAllClientsStats', '/analytics/buyer-clients/?')
  },
  async fetchBuyerClientsLeadsCSV ({ dispatch }) {
    dispatch('fetchAnalyticsCSV', {
      filename: 'buyerClients',
      url: '/analytics/buyer-clients/?'
    })
  }
}

export default {
  actions
}
