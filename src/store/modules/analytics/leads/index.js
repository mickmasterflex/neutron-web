import axios from '@/axios'
import leadsLoading from '@/store/modules/analytics/leads/loading/'

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
    commit('SET_LEAD_FETCH_LOADING')
    await axios.get(`/leads/${id}/`)
      .then(response => {
        commit('SET_CURRENT_LEAD', response.data)
      }).finally(() => {
        commit('RESET_LEAD_FETCH_LOADING')
      })
  },
  async updateLeadData ({ commit }, data) {
    commit('SET_LEAD_PUT_LOADING')
    await axios.put(`/leads/${data.id}/`, data)
      .then(response => {
        commit('SET_CURRENT_LEAD', response.data)
      }).finally(() => {
        commit('RESET_LEAD_PUT_LOADING')
      })
  }
}

const mutations = {
  SET_ANALYTICS_LEADS: (state, leads) => (state.analytics_leads = leads),
  RESET_ANALYTICS_LEADS: (state) => (state.analytics_leads = []),
  SET_CURRENT_LEAD: (state, lead) => (state.current_lead = lead),
  RESET_CURRENT_LEAD: (state) => (state.current_lead = [])
}

const modules = {
  leadsLoading
}

export default {
  state,
  getters,
  actions,
  mutations,
  modules
}
