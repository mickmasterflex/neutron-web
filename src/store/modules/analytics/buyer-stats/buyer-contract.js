import axios from '@/axios'

const state = {
  current_buyer_stats_contract: {},
  buyer_contract_stats_offers: [],
  buyer_contract_stats_contracts: [],
  buyer_contract_stats_ancestors: [],
  buyer_contract_stats_fetch_loading_text: 'Loading Buyer Contract Data'
}

const getters = {
  getCurrentBuyerStatsContract: state => state.current_buyer_stats_contract,
  getBuyerContractStatsOffers: state => state.buyer_contract_stats_offers,
  getBuyerContractStatsContracts: state => state.buyer_contract_stats_contracts,
  getBuyerContractStatsAncestors: state => state.buyer_contract_stats_ancestors
}

const actions = {
  async fetchBuyerContractStats ({ commit, getters }, id) {
    commit('SET_ANALYTICS_FETCH_LOADING_TEXT', state.buyer_contract_stats_fetch_loading_text)
    commit('SET_ANALYTICS_FETCH_LOADING')
    await axios.get(`/analytics/offer-contracts/?${getters.getAnalyticsDateRangeUrlFormatted}&buyer_contract=${id}`)
      .then(response => {
        commit('SET_BUYER_CONTRACT_STATS_OFFERS', response.data.offer_contracts)
        // commit('SET_BUYER_CONTRACT_STATS_CONTRACTS', response.data.buyer_contracts)
        commit('SET_ANALYTICS_TOTALS', response.data.totals)
        commit('SET_ANALYTICS_LEADS', response.data.leads)
        commit('SET_CURRENT_BUYER_STATS_CONTRACT', response.data.contract)
        commit('SET_CURRENT_BUYER_STATS_CLIENT', response.data.client)
        commit('SET_BUYER_CONTRACT_STATS_ANCESTORS', response.data.ancestors)
      }).finally(() => {
        commit('RESET_ANALYTICS_FETCH_LOADING')
      })
  }
}

const mutations = {
  SET_CURRENT_BUYER_STATS_CONTRACT: (state, contract) => (state.current_buyer_stats_contract = contract),
  SET_BUYER_CONTRACT_STATS_OFFERS: (state, buyerOffers) => (state.buyer_contract_stats_offers = buyerOffers),
  SET_BUYER_CONTRACT_STATS_CONTRACTS: (state, contracts) => (state.buyer_contract_stats_contracts = contracts),
  SET_BUYER_CONTRACT_STATS_ANCESTORS: (state, ancestors) => (state.buyer_contract_stats_ancestors = ancestors)
}

export default {
  state,
  getters,
  actions,
  mutations
}
