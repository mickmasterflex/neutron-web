import axios from '@/axios'

const state = {
  buyer_contract_stats_fetch_loading_text: 'Loading Buyer Contract Data'
}

const actions = {
  async fetchBuyerContractStats ({ commit, getters, dispatch }, id) {
    commit('SET_ANALYTICS_FETCH_LOADING_TEXT', state.buyer_contract_stats_fetch_loading_text)
    commit('SET_ANALYTICS_FETCH_LOADING')
    await axios.get(`/analytics/offer-contracts/?${getters.getAnalyticsDateRangeUrlFormatted}&buyer_contract=${id}`)
      .then(response => {
        commit('SET_CURRENT_STATS_OFFERS', response.data.offer_contracts)
        dispatch('setCurrentContractData', response.data)
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
