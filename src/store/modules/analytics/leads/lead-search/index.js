import axios from '@/axios'
import loading from '@/store/modules/analytics/leads/lead-search/loading'

const modules = {
  loading
}

const state = {
  lead_search_results: [],
  current_lead_search_emails: '',
  current_lead_search_ids: ''
}

const getters = {
  getLeadSearchResults: state => state.lead_search_results,
  getCurrentLeadSearchEmails: state => state.current_lead_search_emails,
  getCurrentLeadSearchIds: state => state.current_lead_search_ids
}

const actions = {
  async searchLeads ({ commit, getters }, data) {
    commit('RESET_LEAD_SEARCH_RESULTS')
    commit('SET_LEAD_SEARCH_LOADING')
    commit('SET_CURRENT_LEAD_SEARCH_EMAILS', data.emails)
    commit('SET_CURRENT_LEAD_SEARCH_IDS', data.ids)
    await axios.get(`/analytics/lead-search/?emails=${data.emails}&ids=${data.ids}`, { showSuccessToast: false })
      .then(response => {
        commit('SET_LEAD_SEARCH_RESULTS', response.data.leads)
      }).finally(() => {
        commit('RESET_LEAD_SEARCH_LOADING')
      })
  },
  async searchLeadsCSV ({ getters, dispatch }) {
    dispatch('fetchAnalyticsCSV', {
      filename: 'leadsearch-',
      url: `/analytics/lead-search/?emails=${getters.getCurrentLeadSearchEmails}&ids=${getters.getCurrentLeadSearchIds}`
    })
  }
}

const mutations = {
  SET_LEAD_SEARCH_RESULTS: (state, leads) => (state.lead_search_results = leads),
  RESET_LEAD_SEARCH_RESULTS: (state) => (state.lead_search_results = {}),
  SET_CURRENT_LEAD_SEARCH_EMAILS: (state, emailsString) => (state.current_lead_search_emails = emailsString),
  SET_CURRENT_LEAD_SEARCH_IDS: (state, idsString) => (state.current_lead_search_ids = idsString),
  RESET_CURRENT_LEAD_SEARCH: (state) => {
    state.current_lead_search_emails = ''
    state.current_lead_search_ids = ''
  }
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
