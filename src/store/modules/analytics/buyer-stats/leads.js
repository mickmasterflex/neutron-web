const state = {
  buyer_stats_leads: {}
}

const getters = {
  getBuyerStatsLeads: state => state.buyer_stats_leads
}

const mutations = {
  SET_BUYER_STATS_LEADS: (state, leads) => (state.buyer_stats_leads = leads),
  RESET_BUYER_STATS_LEADS: (state) => (state.buyer_stats_leads = {})
}

export default {
  state,
  getters,
  mutations
}
