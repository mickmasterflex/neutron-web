import buyerClients from './buyer'
import partnerClients from './partner'
import axios from '@/axios'

const modules = {
  buyerClients,
  partnerClients
}

const state = {
  all_clients_stats: [],
  all_clients_stats_fetch_loading_text: 'Loading All Client Data'
}

const getters = {
  getAllClientsStats: state => state.all_clients_stats
}

const actions = {
  async fetchAllClientsStats ({ commit, getters, state }, url) {
    commit('SET_ANALYTICS_FETCH_LOADING_TEXT', state.all_clients_stats_fetch_loading_text)
    commit('SET_ANALYTICS_FETCH_LOADING')
    await axios.get(url + '&' + getters.getAnalyticsDateRangeUrlFormatted)
      .then(response => {
        commit('SET_ALL_CLIENTS_STATS', response.data.clients)
        commit('SET_ANALYTICS_TOTALS', response.data.totals)
        commit('SET_ANALYTICS_LEADS', response.data.leads)
      }).finally(() => {
        commit('RESET_ANALYTICS_FETCH_LOADING')
      })
  }
}

const mutations = {
  SET_ALL_CLIENTS_STATS: (state, buyerClients) => (state.all_clients_stats = buyerClients)
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
