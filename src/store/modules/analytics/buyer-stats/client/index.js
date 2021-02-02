import axios from '@/axios'
import loading from '@/store/modules/analytics/buyer-stats/client/loading'

const modules = {
  loading
}

const state = {
  current_buyer_stats_client: {},
  buyer_client_stats_contracts: [],
  buyer_client_stats_leads: [],
  buyer_client_stats_totals: {}
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
  },
  getBuyerClientStatsTotalLeadCount: state => state.buyer_client_stats_totals.lead_count,
  getBuyerClientStatsTotalSoldCount: state => state.buyer_client_stats_totals.sold_count,
  getBuyerClientStatsTotalRevenue: state => state.buyer_client_stats_totals.revenue,
  getBuyerClientStatsTotalMargin: state => state.buyer_client_stats_totals.margin,
  getBuyerClientStatsTotalPayout: state => state.buyer_client_stats_totals.payout,
  getBuyerClientStatsTotalScrubRate: state => state.buyer_client_stats_totals.scrub_rate,
  getBuyerClientStatsTotalMarginPercent: state => state.buyer_client_stats_totals.margin_percent,
  getBuyerClientStatsLeads: state => state.buyer_client_stats_leads
}

const actions = {
  async fetchBuyerClientStats ({ commit, getters }, id) {
    commit('SET_BUYER_CLIENT_STATS_FETCH_LOADING')
    await axios.get(`/analytics/buyer-contracts/?${getters.getAnalyticsDateRangeUrlFormatted}&client=${id}`)
      .then(response => {
        commit('SET_BUYER_CLIENT_STATS_CONTRACTS', response.data.contracts)
        commit('SET_BUYER_CLIENT_STATS_TOTALS', response.data.totals)
        commit('SET_BUYER_CLIENT_STATS_LEADS', response.data.leads)
        commit('SET_CURRENT_BUYER_STATS_CLIENT', response.data.client)
      }).finally(() => {
        commit('RESET_BUYER_CLIENT_STATS_FETCH_LOADING')
      })
  }
}

const mutations = {
  SET_CURRENT_BUYER_STATS_CLIENT: (state, buyerClient) => (state.current_buyer_stats_client = buyerClient),
  SET_BUYER_CLIENT_STATS_CONTRACTS: (state, buyerContracts) => (state.buyer_client_stats_contracts = buyerContracts),
  SET_BUYER_CLIENT_STATS_TOTALS: (state, totals) => (state.buyer_client_stats_totals = totals),
  SET_BUYER_CLIENT_STATS_LEADS: (state, leads) => (state.buyer_client_stats_leads = leads)
}

export default {
  state,
  getters,
  actions,
  mutations,
  modules
}
