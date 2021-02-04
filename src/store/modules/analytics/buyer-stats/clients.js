import axios from '@/axios'

const state = {
  buyer_stats_clients: {},
  buyer_stats_clients_fetch_loading_text: 'Loading Buyer Clients Data'
}

const getters = {
  getBuyerStatsClients: state => state.buyer_stats_clients
}

const actions = {
  async fetchBuyerClientsStats ({ commit, getters, state }) {
    commit('SET_ANALYTICS_FETCH_LOADING_TEXT', state.buyer_stats_clients_fetch_loading_text)
    commit('SET_ANALYTICS_FETCH_LOADING')
    await axios.get(`/analytics/buyer-clients/?${getters.getAnalyticsDateRangeUrlFormatted}`)
      .then(response => {
        commit('SET_BUYER_STATS_CLIENTS', response.data.clients)
        commit('SET_BUYER_STATS_TOTALS', response.data.totals)
        commit('SET_ANALYTICS_LEADS', response.data.leads)
      }).finally(() => {
        commit('RESET_ANALYTICS_FETCH_LOADING')
      })
  }
}

const mutations = {
  SET_BUYER_STATS_CLIENTS: (state, buyerClients) => (state.buyer_stats_clients = buyerClients)
}

export default {
  state,
  getters,
  actions,
  mutations
}
