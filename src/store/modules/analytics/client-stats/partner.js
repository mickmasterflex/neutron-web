const state = {
  partner_client_stats_fetch_loading_text: 'Loading Partner Contracts Data'
}

const actions = {
  async fetchPartnerClientStats ({ dispatch }, id) {
    dispatch('fetchClientStats', `/analytics/partner-contracts/?client=${id}`)
  },
  async fetchPartnerClientLeadsCSV ({ dispatch }, id) {
    dispatch('fetchAnalyticsCSV', {
      filename: 'partnerClient-' + id,
      url: `/analytics/partner-contracts/?client=${id}`
    })
  }
}

export default {
  state,
  actions
}
