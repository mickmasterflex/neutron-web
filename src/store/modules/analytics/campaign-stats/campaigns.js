const state = {
  current_stats_campaigns: []
}

const getters = {
  getCurrentStatsCampaigns: state => state.current_stats_campaigns
}

const mutations = {
  SET_CURRENT_STATS_CAMPAIGNS: (state, partnerCampaigns) => (state.current_stats_campaigns = partnerCampaigns)
}

export default {
  state,
  getters,
  mutations
}
