import axios from '@/axios'

const state = {
  current_partner_stats_client: {},
  partner_client_stats_contracts: [],
  partner_client_stats_fetch_loading_text: 'Loading Partner Contracts Data'
}

const getters = {
  getCurrentPartnerStatsClient: state => state.current_partner_stats_client,
  getPartnerClientContracts: state => state.partner_client_stats_contracts,
  getPartnerClientContractsByParentCount: (state) => (contractId) => {
    const contracts = state.partner_client_stats_contracts.filter(contract => contract.parent === contractId)
    return contracts.length
  }
}

const actions = {
  async fetchPartnerClientStats ({ commit, getters, state }, id) {
    commit('SET_ANALYTICS_FETCH_LOADING_TEXT', state.partner_client_stats_fetch_loading_text)
    commit('SET_ANALYTICS_FETCH_LOADING')
    await axios.get(`/analytics/partner-contracts/?${getters.getAnalyticsDateRangeUrlFormatted}&client=${id}`)
      .then(response => {
        commit('SET_PARTNER_CLIENT_STATS_CONTRACTS', response.data.contracts)
        commit('SET_ANALYTICS_TOTALS', response.data.totals)
        commit('SET_ANALYTICS_LEADS', response.data.leads)
        commit('SET_CURRENT_PARTNER_STATS_CLIENT', response.data.client)
      }).finally(() => {
        commit('RESET_ANALYTICS_FETCH_LOADING')
      })
  }
}

const mutations = {
  SET_CURRENT_PARTNER_STATS_CLIENT: (state, partnerClient) => (state.current_partner_stats_client = partnerClient),
  SET_PARTNER_CLIENT_STATS_CONTRACTS: (state, partnerContracts) => (state.partner_client_stats_contracts = partnerContracts)
}

export default {
  state,
  getters,
  actions,
  mutations
}
