import axios from '@/axios'

const state = {
  current_buyer_stats_client: {},
  buyer_client_stats_contracts: [],
  buyer_client_stats_fetch_loading_text: 'Loading Buyer Contracts Data'
}

const getters = {
  getCurrentBuyerStatsClient: state => state.current_buyer_stats_client,
  getBuyerClientContracts: state => state.buyer_client_stats_contracts,
  getBuyerClientContractsParentless: state => state.buyer_client_stats_contracts.filter(contract => contract.parent === null),
  getBuyerClientContractsByParent: (state) => (contractId) => {
    return state.buyer_client_stats_contracts.filter(contract => contract.parent === contractId)
  },
  getBuyerClientContractsByParentCount: (state) => (contractId) => {
    const contracts = state.buyer_client_stats_contracts.filter(contract => contract.parent === contractId)
    return contracts.length
  }
}

const actions = {
  async fetchBuyerClientStats ({ commit, getters, state }, id) {
    commit('SET_ANALYTICS_FETCH_LOADING_TEXT', state.buyer_client_stats_fetch_loading_text)
    commit('SET_ANALYTICS_FETCH_LOADING')
    await axios.get(`/analytics/buyer-contracts/?${getters.getAnalyticsDateRangeUrlFormatted}&client=${id}`)
      .then(response => {
        commit('SET_BUYER_CLIENT_STATS_CONTRACTS', response.data.contracts)
        commit('SET_BUYER_STATS_TOTALS', response.data.totals)
        commit('SET_BUYER_STATS_LEADS', response.data.leads)
        commit('SET_CURRENT_BUYER_STATS_CLIENT', response.data.client)
      }).finally(() => {
        commit('RESET_ANALYTICS_FETCH_LOADING')
      })
  }
}

const mutations = {
  SET_CURRENT_BUYER_STATS_CLIENT: (state, buyerClient) => (state.current_buyer_stats_client = buyerClient),
  SET_BUYER_CLIENT_STATS_CONTRACTS: (state, buyerContracts) => (state.buyer_client_stats_contracts = buyerContracts)
}

export default {
  state,
  getters,
  actions,
  mutations
}
