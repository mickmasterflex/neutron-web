import axios from '@/axios'

const state = {
  current_partner_stats_contract: {},
  partner_contract_stats_campaigns: [],
  partner_contract_stats_fetch_loading_text: 'Loading Partner Contract Data'
}

const getters = {
  getCurrentPartnerStatsContract: state => state.current_partner_stats_contract,
  getPartnerContractStatsCampaigns: state => state.partner_contract_stats_campaigns
}

const actions = {
  async fetchPartnerContractStats ({ commit, getters }, id) {
    commit('SET_ANALYTICS_FETCH_LOADING_TEXT', state.partner_contract_stats_fetch_loading_text)
    commit('SET_ANALYTICS_FETCH_LOADING')
    await axios.get(`/analytics/campaigns/?${getters.getAnalyticsDateRangeUrlFormatted}&partner_contract=${id}`)
      .then(response => {
        commit('SET_PARTNER_CONTRACT_STATS_CAMPAIGNS', response.data.campaigns)
        commit('SET_ANALYTICS_TOTALS', response.data.totals)
        commit('SET_ANALYTICS_LEADS', response.data.leads)
        commit('SET_CURRENT_PARTNER_STATS_CONTRACT', response.data.contract)
        commit('SET_CURRENT_PARTNER_STATS_CLIENT', response.data.client)
      }).finally(() => {
        commit('RESET_ANALYTICS_FETCH_LOADING')
      })
  }
}

const mutations = {
  SET_CURRENT_PARTNER_STATS_CONTRACT: (state, contract) => (state.current_partner_stats_contract = contract),
  SET_PARTNER_CONTRACT_STATS_CAMPAIGNS: (state, partnerCampaigns) => (state.partner_contract_stats_campaigns = partnerCampaigns)
}

export default {
  state,
  getters,
  actions,
  mutations
}
