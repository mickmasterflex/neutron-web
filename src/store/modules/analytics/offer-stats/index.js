import axios from '@/axios'
import offers from '@/store/modules/analytics/offer-stats/offers'

const modules = {
  offers
}

const state = {
  offer_contract_stats_ancestors: [],
  current_offer_contract_stats: {},
  offer_contract_stats_fetch_loading_text: 'Loading Offer Contracts Data'
}

const getters = {
  getOfferContractStatsAncestors: state => state.offer_contract_stats_ancestors,
  getCurrentOfferContractStats: state => state.current_offer_contract_stats
}

const actions = {
  async fetchOfferContractStats ({ commit, getters }, id) {
    commit('SET_ANALYTICS_FETCH_LOADING_TEXT', state.offer_contract_stats_fetch_loading_text)
    commit('SET_ANALYTICS_FETCH_LOADING')
    await axios.get(`/analytics/leads/?${getters.getAnalyticsDateRangeUrlFormatted}&offer_contract=${id}`)
      .then(response => {
        commit('SET_ANALYTICS_TOTALS', response.data.totals)
        commit('SET_ANALYTICS_LEADS', response.data.leads)
        commit('SET_CURRENT_OFFER_CONTRACT_STATS', response.data.offer_contract)
        commit('SET_CURRENT_CONTRACT_STATS', response.data.contract)
        commit('SET_CURRENT_CLIENT_STATS', response.data.client)
        commit('SET_OFFER_CONTRACT_STATS_ANCESTORS', response.data.ancestors)
      }).finally(() => {
        commit('RESET_ANALYTICS_FETCH_LOADING')
      })
  },
  async fetchOfferContractLeadsCSV ({ dispatch }, id) {
    dispatch('fetchAnalyticsCSV', {
      filename: 'offer-' + id,
      url: `/analytics/leads/?offer_contract=${id}`
    })
  }
}

const mutations = {
  SET_OFFER_CONTRACT_STATS_ANCESTORS: (state, ancestors) => (state.offer_contract_stats_ancestors = ancestors),
  SET_CURRENT_OFFER_CONTRACT_STATS: (state, offer) => (state.current_offer_contract_stats = offer)
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
