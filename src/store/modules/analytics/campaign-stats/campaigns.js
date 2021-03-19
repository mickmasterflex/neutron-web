const state = {
  current_stats_campaigns: []
}

const getters = {
  getCurrentStatsCampaigns: state => state.current_stats_campaigns,
  getCurrentStatsCampaignsByPartner: (state) => (partnerId) => {
    return state.current_stats_campaigns.filter(campaign => {
      if (campaign.contract) {
        return campaign.contract.id === partnerId
      }
    })
  }
}

const mutations = {
  SET_CURRENT_STATS_CAMPAIGNS: (state, partnerCampaigns) => (state.current_stats_campaigns = partnerCampaigns)
}

export default {
  state,
  getters,
  mutations
}
