import axios from '@/axios'

const state = {
  current_buyer_stats_offer_contract: {},
  offer_contract_stats_ancestors: [],
  offer_contract_stats_fetch_loading_text: 'Loading Offer Contracts Data'
}

const getters = {
  getCurrentBuyerStatsOffer: state => state.current_buyer_stats_offer_contract,
  getOfferContractStatsAncestors: state => state.offer_contract_stats_ancestors
}

const actions = {
  async fetchOfferContractStats ({ commit, getters }, id) {
    commit('SET_ANALYTICS_FETCH_LOADING_TEXT', state.offer_contract_stats_fetch_loading_text)
    commit('SET_ANALYTICS_FETCH_LOADING')
    await axios.get(`/analytics/leads/?${getters.getAnalyticsDateRangeUrlFormatted}&offer_contract=${id}`)
      .then(response => {
        commit('SET_ANALYTICS_TOTALS', response.data.totals)
        commit('SET_ANALYTICS_LEADS', response.data.leads)
        commit('SET_CURRENT_BUYER_STATS_OFFER_CONTRACT', response.data.offer_contract)
        commit('SET_CURRENT_BUYER_STATS_CONTRACT', response.data.contract)
        commit('SET_CURRENT_BUYER_STATS_CLIENT', response.data.client)
        commit('SET_OFFER_CONTRACT_STATS_ANCESTORS', response.data.buyer_ancestors)
      }).finally(() => {
        commit('RESET_ANALYTICS_FETCH_LOADING')
      })
  }
}

const mutations = {
  SET_CURRENT_BUYER_STATS_OFFER_CONTRACT: (state, offer) => (state.current_buyer_stats_offer_contract = offer),
  SET_OFFER_CONTRACT_STATS_ANCESTORS: (state, ancestors) => (state.offer_contract_stats_ancestors = ancestors)
}

export default {
  state,
  getters,
  actions,
  mutations
}
