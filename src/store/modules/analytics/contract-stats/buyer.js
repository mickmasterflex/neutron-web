import axios from '@/axios'

const state = {
  buyer_contract_stats_fetch_loading_text: 'Loading Buyer Contract Data',
  buyer_contract_stats_ancestors: []
}

const getters = {
  getBuyerContractStatsAncestors: state => state.buyer_contract_stats_ancestors
}

const actions = {
  async fetchBuyerContractStats ({ commit, getters }, id) {
    commit('SET_ANALYTICS_FETCH_LOADING_TEXT', state.buyer_contract_stats_fetch_loading_text)
    commit('SET_ANALYTICS_FETCH_LOADING')
    await axios.get(`/analytics/offer-contracts/?${getters.getAnalyticsDateRangeUrlFormatted}&buyer_contract=${id}`)
      .then(response => {
        commit('SET_CURRENT_STATS_DESCENDANT_CONTRACT_DATA', response.data.descendant_contract_data)
        commit('SET_CURRENT_STATS_CONTRACTS', response.data.descendants)
        commit('SET_CURRENT_STATS_OFFERS', response.data.offer_contracts)
        commit('SET_ANALYTICS_TOTALS', response.data.totals)
        commit('SET_ANALYTICS_LEADS', response.data.leads)
        commit('SET_CURRENT_CONTRACT_STATS', response.data.contract)
        commit('SET_CURRENT_CLIENT_STATS', response.data.client)
        commit('SET_BUYER_CONTRACT_STATS_ANCESTORS', response.data.ancestors)
      }).finally(() => {
        commit('RESET_ANALYTICS_FETCH_LOADING')
      })
  },
  async fetchBuyerContractLeadsCSV ({ dispatch }, id) {
    dispatch('fetchAnalyticsCSV', {
      filename: 'buyerContract-' + id,
      url: `/analytics/offer-contracts/?buyer_contract=${id}`
    })
  }
}

const mutations = {
  SET_BUYER_CONTRACT_STATS_ANCESTORS: (state, ancestors) => (state.buyer_contract_stats_ancestors = ancestors)
}

export default {
  state,
  getters,
  actions,
  mutations
}
