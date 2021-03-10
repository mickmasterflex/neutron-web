const state = {
  analytics_leads: [],
  current_lead: {}
}

const getters = {
  getAnalyticsLeads: state => state.analytics_leads,
  getCurrentLead: state => state.current_lead
}

const mutations = {
  SET_ANALYTICS_LEADS: (state, leads) => (state.analytics_leads = leads),
  RESET_ANALYTICS_LEADS: (state) => (state.analytics_leads = []),
  SET_CURRENT_LEAD: (state, lead) => (state.current_lead = lead),
  RESET_CURRENT_LEAD: (state) => (state.current_lead = [])
}

export default {
  state,
  getters,
  mutations
}
