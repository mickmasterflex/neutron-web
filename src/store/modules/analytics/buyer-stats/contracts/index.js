import axios from '@/axios'
import loading from '@/store/modules/analytics/buyer-stats/contracts/loading'

const modules = {
  loading
}

const state = {
  buyer_contracts: {},
  buyer_contracts_leads: {},
  buyer_contracts_totals: {}
}

const getters = {
  getBuyerContracts: state => state.buyer_contracts,
  getBuyerContractsTotalLeadCount: state => state.buyer_contracts_totals.lead_count,
  getBuyerContractsTotalSoldCount: state => state.buyer_contracts_totals.sold_count,
  getBuyerContractsTotalRevenue: state => state.buyer_contracts_totals.revenue,
  getBuyerContractsTotalMargin: state => state.buyer_contracts_totals.margin,
  getBuyerContractsTotalPayout: state => state.buyer_contracts_totals.payout,
  getBuyerContractsTotalScrubRate: state => state.buyer_contracts_totals.scrub_rate,
  getBuyerContractsTotalMarginPercent: state => state.buyer_contracts_totals.margin_percent,
  getBuyerContractsLeads: state => state.buyer_contracts_leads
}

const actions = {
  async fetchBuyerContractStats ({ commit, getters }, id) {
    commit('SET_BUYER_CONTRACTS_FETCH_LOADING')
    await axios.get(`/analytics/buyer-contracts/?${getters.getAnalyticsDateRangeUrlFormatted}&client=${id}`)
      .then(response => {
        commit('SET_BUYER_CONTRACTS', response.data.buyer_contracts)
        commit('SET_BUYER_CONTRACTS_TOTALS', response.data.totals)
        commit('SET_BUYER_CONTRACTS_LEADS', response.data.leads)
      }).finally(() => {
        commit('RESET_BUYER_CONTRACTS_FETCH_LOADING')
      })
  }
}

const mutations = {
  SET_BUYER_CONTRACTS: (state, buyerContracts) => (state.buyer_contracts = buyerContracts),
  SET_BUYER_CONTRACTS_TOTALS: (state, totals) => (state.buyer_contracts_totals = totals),
  SET_BUYER_CONTRACTS_LEADS: (state, leads) => (state.buyer_contracts_leads = leads)
}

export default {
  state,
  getters,
  actions,
  mutations,
  modules
}
