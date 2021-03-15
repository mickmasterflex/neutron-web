import axios from '@/axios'

const state = {
  analytics_leads: [],
  current_lead: {},
  lead_stats_fetch_loading_text: 'Loading Lead Contracts Data'
}

const getters = {
  getAnalyticsLeads: state => state.analytics_leads,
  getCurrentLead: state => state.current_lead
}

const actions = {
  async fetchCurrentLead ({ commit }, id) {
    commit('SET_ANALYTICS_FETCH_LOADING_TEXT', state.lead_stats_fetch_loading_text)
    commit('SET_ANALYTICS_FETCH_LOADING')
    await axios.get(`/leads/${id}/`)
      .then(response => {
        commit('SET_CURRENT_LEAD', response.data)
      })
  }
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
  actions,
  mutations
}
