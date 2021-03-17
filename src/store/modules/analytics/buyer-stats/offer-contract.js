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
        commit('SET_ANALYTICS_TOTALS', response.data.totals)
        commit('SET_ANALYTICS_LEADS', response.data.leads)
        commit('SET_CURRENT_BUYER_STATS_OFFER_CONTRACT', response.data.offer_contract)
        commit('SET_CURRENT_BUYER_STATS_CONTRACT', response.data.contract)
        commit('SET_CURRENT_CLIENT_STATS', response.data.client)
      }).finally(() => {
        commit('RESET_ANALYTICS_FETCH_LOADING')
      })
  },
  async fetchOfferContractLeadsCSV ({ dispatch }, id) {
    dispatch('fetchAnalyticsStatsCSV', {
      filename: 'offer-' + id,
      url: `/analytics/leads/?offer_contract=${id}`
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
