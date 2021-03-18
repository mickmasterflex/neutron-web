import axios from '@/axios'

const state = {
  current_partner_stats_campaign: {},
  campaign_stats_fetch_loading_text: 'Loading Campaign Contracts Data'
}

const getters = {
  getCurrentPartnerStatsCampaign: state => state.current_partner_stats_campaign
}

const actions = {
  async fetchCampaignStats ({ commit, getters }, id) {
    commit('SET_ANALYTICS_FETCH_LOADING_TEXT', state.campaign_stats_fetch_loading_text)
    commit('SET_ANALYTICS_FETCH_LOADING')
    await axios.get(`/analytics/leads/?${getters.getAnalyticsDateRangeUrlFormatted}&campaign=${id}`)
      .then(response => {
        commit('SET_ANALYTICS_TOTALS', response.data.totals)
        commit('SET_ANALYTICS_LEADS', response.data.leads)
        commit('SET_CURRENT_PARTNER_STATS_CAMPAIGN', response.data.campaign)
        commit('SET_CURRENT_PARTNER_STATS_CONTRACT', response.data.contract)
        commit('SET_CURRENT_CLIENT_STATS', response.data.client)
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
  SET_CURRENT_PARTNER_STATS_CAMPAIGN: (state, campaign) => (state.current_partner_stats_campaign = campaign)
}

export default {
  state,
  getters,
  actions,
  mutations
}
