import axios from '@/axios'
import loading from '@/store/modules/analytics/buyer-stats/contracts/loading'

const modules = {
  loading
}

const state = {
  current_buyer_stats_contract: {},
  buyer_stats_contracts: [],
  buyer_stats_contracts_leads: [],
  buyer_stats_contracts_totals: {}
}

const getters = {
  getCurrentBuyerStatsContract: state => state.current_buyer_stats_contract,
  getBuyerStatsContracts: state => state.buyer_stats_contracts,
  getBuyerStatsContractsParentless: state => state.buyer_stats_contracts.filter(contract => contract.parent === null),
  getBuyerStatsContractsByParent: (state) => (contractId) => {
    return state.buyer_stats_contracts.filter(contract => contract.parent === contractId)
  },
  getBuyerStatsContractsByParentCount: (state) => (contractId) => {
    const contracts = state.buyer_stats_contracts.filter(contract => contract.parent === contractId)
    return contracts.length
  },
  getBuyerStatsContractsTotalLeadCount: state => state.buyer_stats_contracts_totals.lead_count,
  getBuyerStatsContractsTotalSoldCount: state => state.buyer_stats_contracts_totals.sold_count,
  getBuyerStatsContractsTotalRevenue: state => state.buyer_stats_contracts_totals.revenue,
  getBuyerStatsContractsTotalMargin: state => state.buyer_stats_contracts_totals.margin,
  getBuyerStatsContractsTotalPayout: state => state.buyer_stats_contracts_totals.payout,
  getBuyerStatsContractsTotalScrubRate: state => state.buyer_stats_contracts_totals.scrub_rate,
  getBuyerStatsContractsTotalMarginPercent: state => state.buyer_stats_contracts_totals.margin_percent,
  getBuyerStatsContractsLeads: state => state.buyer_stats_contracts_leads
}

const actions = {
  async fetchBuyerContractsStats ({ commit, getters }, id) {
    commit('SET_BUYER_STATS_CONTRACTS_FETCH_LOADING')
    await axios.get(`/analytics/buyer-contracts/?${getters.getAnalyticsDateRangeUrlFormatted}&client=${id}`)
      .then(response => {
        commit('SET_BUYER_STATS_CONTRACTS', response.data.buyer_contracts)
        commit('SET_BUYER_STATS_CONTRACTS_TOTALS', response.data.totals)
        commit('SET_BUYER_STATS_CONTRACTS_LEADS', response.data.leads)
      }).finally(() => {
        commit('RESET_BUYER_STATS_CONTRACTS_FETCH_LOADING')
      })
  }
}

const mutations = {
  SET_CURRENT_BUYER_STATS_CONTRACT: (state, contract) => (state.current_buyer_stats_contract = contract),
  RESET_CURRENT_BUYER_STATS_CONTRACT: (state) => (state.current_buyer_stats_contract = {}),
  SET_BUYER_STATS_CONTRACTS: (state, buyerContracts) => (state.buyer_stats_contracts = buyerContracts),
  SET_BUYER_STATS_CONTRACTS_TOTALS: (state, totals) => (state.buyer_stats_contracts_totals = totals),
  SET_BUYER_STATS_CONTRACTS_LEADS: (state, leads) => (state.buyer_stats_contracts_leads = leads)
}

export default {
  state,
  getters,
  actions,
  mutations,
  modules
}
