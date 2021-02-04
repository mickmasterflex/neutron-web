import axios from '@/axios'

const state = {
  current_buyer_stats_offer_contract: {},
  offer_contract_stats_fetch_loading_text: 'Loading Offer Contracts Data'
}

const getters = {
  getCurrentBuyerStatsOffer: state => state.current_buyer_stats_offer_contract
}

const actions = {
  async fetchOfferContractStats ({ commit, getters }, id) {
    commit('SET_ANALYTICS_FETCH_LOADING_TEXT', state.offer_contract_stats_fetch_loading_text)
    commit('SET_ANALYTICS_FETCH_LOADING')
    await axios.get(`/analytics/leads/?${getters.getAnalyticsDateRangeUrlFormatted}&offer_contract=${id}`)
      .then(response => {
        commit('SET_BUYER_STATS_TOTALS', response.data.totals)
        commit('SET_ANALYTICS_LEADS', response.data.leads)
        commit('SET_CURRENT_BUYER_STATS_OFFER_CONTRACT', response.data.offer_contract)
        commit('SET_CURRENT_BUYER_STATS_CONTRACT', response.data.contract)
        commit('SET_CURRENT_BUYER_STATS_CLIENT', response.data.client)
      }).finally(() => {
        commit('RESET_ANALYTICS_FETCH_LOADING')
      })
  }
}

const mutations = {
  SET_CURRENT_BUYER_STATS_OFFER_CONTRACT: (state, offer) => (state.current_buyer_stats_offer_contract = offer)
}

export default {
  state,
  getters,
  actions,
  mutations
}
