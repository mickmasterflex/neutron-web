import axios from '@/axios'

const state = {
  current_buyer_stats_contract: {},
  buyer_contract_stats_offers: {},
  buyer_contract_stats_fetch_loading_text: 'Loading Buyer Contract Data'
}

const getters = {
  getCurrentBuyerStatsContract: state => state.current_buyer_stats_contract,
  getBuyerContractStatsOffers: state => state.buyer_contract_stats_offers
}

const actions = {
  async fetchBuyerContractStats ({ commit, getters }, id) {
    commit('SET_ANALYTICS_FETCH_LOADING_TEXT', state.buyer_contract_stats_fetch_loading_text)
    commit('SET_ANALYTICS_FETCH_LOADING')
    await axios.get(`/analytics/offer-contracts/?${getters.getAnalyticsDateRangeUrlFormatted}&buyer_contract=${id}`)
      .then(response => {
        commit('SET_BUYER_CONTRACT_STATS_OFFERS', response.data.offer_contracts)
        commit('SET_BUYER_STATS_TOTALS', response.data.totals)
        commit('SET_BUYER_STATS_LEADS', response.data.leads)
        commit('SET_CURRENT_BUYER_STATS_CONTRACT', response.data.contract)
        commit('SET_CURRENT_BUYER_STATS_CLIENT', response.data.client)
      }).finally(() => {
        commit('RESET_ANALYTICS_FETCH_LOADING')
      })
  }
}

const mutations = {
  SET_CURRENT_BUYER_STATS_CONTRACT: (state, contract) => (state.current_buyer_stats_contract = contract),
  SET_BUYER_CONTRACT_STATS_OFFERS: (state, buyerOffers) => (state.buyer_contract_stats_offers = buyerOffers)
}

export default {
  state,
  getters,
  actions,
  mutations
}
