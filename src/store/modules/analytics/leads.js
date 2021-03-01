const state = {
  analytics_leads: {}
}

const getters = {
  getAnalyticsLeads: state => state.analytics_leads
}

const mutations = {
  SET_ANALYTICS_LEADS: (state, leads) => (state.analytics_leads = leads),
  RESET_ANALYTICS_LEADS: (state) => (state.analytics_leads = {})
}

export default {
  state,
  getters,
  mutations
}
