import axios from '@/axios'
import loading from '@/store/modules/analytics/buyer-stats/buyer-contract/loading'

const modules = {
  loading
}

const state = {
  current_buyer_stats_contract: {},
  buyer_contract_stats_offers: {},
  buyer_contract_stats_leads: {},
  buyer_contract_stats_totals: {}
}

const getters = {
  getCurrentBuyerStatsContract: state => state.current_buyer_stats_contract,
  getBuyerContractStatsOffers: state => state.buyer_contract_stats_offers,
  getBuyerContractStatsLeads: state => state.buyer_contract_stats_leads
}

const actions = {
  async fetchBuyerContractStats ({ commit, getters }, id) {
    commit('SET_BUYER_CONTRACT_STATS_FETCH_LOADING')
    await axios.get(`/analytics/offer-contracts/?${getters.getAnalyticsDateRangeUrlFormatted}&buyer_contract=${id}`)
      .then(response => {
        commit('SET_BUYER_CONTRACT_STATS_OFFERS', response.data.offer_contracts)
        commit('SET_BUYER_STATS_TOTALS', response.data.totals)
        commit('SET_BUYER_CONTRACT_STATS_LEADS', response.data.leads)
        commit('SET_CURRENT_BUYER_STATS_CONTRACT', response.data.contract)
        commit('SET_CURRENT_BUYER_STATS_CLIENT', response.data.client)
      }).finally(() => {
        commit('RESET_BUYER_CONTRACT_STATS_FETCH_LOADING')
      })
  }
}

const mutations = {
  SET_CURRENT_BUYER_STATS_CONTRACT: (state, contract) => (state.current_buyer_stats_contract = contract),
  SET_BUYER_CONTRACT_STATS_OFFERS: (state, buyerOffers) => (state.buyer_contract_stats_offers = buyerOffers),
  SET_BUYER_CONTRACT_STATS_LEADS: (state, leads) => (state.buyer_contract_stats_leads = leads)
}

export default {
  state,
  getters,
  actions,
  mutations,
  modules
}
