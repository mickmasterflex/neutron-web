
const actions = {
  async fetchPartnerClientsStats ({ dispatch }) {
    dispatch('fetchAllClientsStats', '/analytics/partner-clients/?')
  },
  async fetchPartnerClientsLeadsCSV ({ dispatch }) {
    dispatch('fetchAnalyticsCSV', {
      filename: 'partnerClients',
      url: '/analytics/partner-clients/?'
    })
  }
}

export default {
  actions
}
