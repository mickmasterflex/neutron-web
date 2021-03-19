import axios from '@/axios'

const state = {
  buyer_contract_stats_fetch_loading_text: 'Loading Buyer Contract Data'
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

export default {
  state,
  actions
}
