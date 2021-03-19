import axios from '@/axios'

const state = {
  partner_contract_stats_fetch_loading_text: 'Loading Partner Contract Data',
  partner_contract_stats_ancestors: []
}

const getters = {
  getPartnerContractStatsAncestors: state => state.partner_contract_stats_ancestors
}

const actions = {
  async fetchPartnerContractStats ({ commit, getters }, id) {
    commit('SET_ANALYTICS_FETCH_LOADING_TEXT', state.partner_contract_stats_fetch_loading_text)
    commit('SET_ANALYTICS_FETCH_LOADING')
    await axios.get(`/analytics/campaigns/?${getters.getAnalyticsDateRangeUrlFormatted}&partner_contract=${id}`)
      .then(response => {
        commit('SET_CURRENT_STATS_DESCENDANT_CONTRACT_DATA', response.data.descendant_contract_data)
        commit('SET_CURRENT_STATS_CONTRACTS', response.data.descendants)
        commit('SET_CURRENT_STATS_CAMPAIGNS', response.data.campaigns)
        commit('SET_ANALYTICS_TOTALS', response.data.totals)
        commit('SET_ANALYTICS_LEADS', response.data.leads)
        commit('SET_CURRENT_CONTRACT_STATS', response.data.contract)
        commit('SET_CURRENT_CLIENT_STATS', response.data.client)
        commit('SET_PARTNER_CONTRACT_STATS_ANCESTORS', response.data.ancestors)
      }).finally(() => {
        commit('RESET_ANALYTICS_FETCH_LOADING')
      })
  },
  async fetchPartnerContractLeadsCSV ({ dispatch }, id) {
    dispatch('fetchAnalyticsCSV', {
      filename: 'partnerContract-' + id,
      url: `/analytics/campaigns/?partner_contract=${id}`
    })
  }
}

const mutations = {
  SET_PARTNER_CONTRACT_STATS_ANCESTORS: (state, ancestors) => (state.buyer_contract_stats_ancestors = ancestors)
}

export default {
  state,
  getters,
  actions,
  mutations
}
