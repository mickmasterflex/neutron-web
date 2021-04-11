import campaigns from './campaigns'
import axios from '@/axios'

const modules = {
  campaigns
}

const state = {
  current_campaign_stats: {},
  campaign_stats_fetch_loading_text: 'Loading Campaign Contracts Data'
}

const getters = {
  getCurrentCampaignStats: state => state.current_campaign_stats
}

const actions = {
  async fetchCampaignStats ({ commit, getters }, id) {
    commit('SET_ANALYTICS_FETCH_LOADING_TEXT', state.campaign_stats_fetch_loading_text)
    commit('SET_ANALYTICS_FETCH_LOADING')
    await axios.get(`/analytics/leads/?${getters.getAnalyticsDateRangeUrlFormatted}&campaign=${id}`)
      .then(response => {
        commit('SET_ANALYTICS_TOTALS', response.data.totals)
        commit('SET_ANALYTICS_LEADS', response.data.leads)
        commit('SET_CURRENT_CAMPAIGN_STATS', response.data.campaign)
        commit('SET_CURRENT_CONTRACT_STATS', response.data.contract)
        commit('SET_CURRENT_CLIENT_STATS', response.data.client)
        commit('SET_CURRENT_ANCESTORS', response.data.ancestors)
      }).finally(() => {
        commit('RESET_ANALYTICS_FETCH_LOADING')
      })
  },
  async fetchCampaignLeadsCSV ({ dispatch }, id) {
    dispatch('fetchAnalyticsCSV', {
      filename: 'campaign-' + id,
      url: `/analytics/leads/?campaign=${id}`
    })
  }
}

const mutations = {
  SET_CURRENT_CAMPAIGN_STATS: (state, campaign) => (state.current_campaign_stats = campaign)
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
