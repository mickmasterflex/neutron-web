import buyerClientStats from './buyer'
import partnerClientStats from './partner'
import axios from '@/axios'

const modules = {
  buyerClientStats,
  partnerClientStats
}

const state = {
  current_client_stats: {}
}

const getters = {
  getCurrentClientStats: state => state.current_client_stats
}

const actions = {
  async fetchClientStats ({ commit, getters, state }, url) {
    commit('SET_ANALYTICS_FETCH_LOADING_TEXT', state.partner_client_stats_fetch_loading_text)
    commit('SET_ANALYTICS_FETCH_LOADING')
    await axios.get(url + '&' + getters.getAnalyticsDateRangeUrlFormatted)
      .then(response => {
        commit('SET_CURRENT_STATS_DESCENDANT_CONTRACT_DATA', response.data.descendant_contract_data)
        commit('SET_CURRENT_STATS_CONTRACTS', response.data.contracts)
        commit('SET_ANALYTICS_TOTALS', response.data.totals)
        commit('SET_ANALYTICS_LEADS', response.data.leads)
        commit('SET_CURRENT_CLIENT_STATS', response.data.client)
      }).finally(() => {
        commit('RESET_ANALYTICS_FETCH_LOADING')
      })
  },
  async fetchPartnerClientLeadsCSV ({ dispatch }, id) {
    dispatch('fetchAnalyticsCSV', {
      filename: 'partnerClient-' + id,
      url: `/analytics/partner-contracts/?client=${id}`
    })
  }
}

const mutations = {
  SET_CURRENT_CLIENT_STATS: (state, client) => (state.current_client_stats = client)
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
