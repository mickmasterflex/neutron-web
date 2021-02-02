import axios from '@/axios'
import loading from '@/store/modules/analytics/buyer-stats/clients/loading'

const modules = {
  loading
}

const state = {
  buyer_stats_clients: {},
  buyer_stats_clients_leads: {},
  buyer_stats_clients_totals: {}
}

const getters = {
  getBuyerStatsClients: state => state.buyer_stats_clients,
  getBuyerStatsClientsLeads: state => state.buyer_stats_clients_leads
}

const actions = {
  async fetchBuyerClientsStats ({ commit, getters }) {
    commit('SET_BUYER_STATS_CLIENTS_FETCH_LOADING')
    await axios.get(`/analytics/buyer-clients/?${getters.getAnalyticsDateRangeUrlFormatted}`)
      .then(response => {
        commit('SET_BUYER_STATS_CLIENTS', response.data.clients)
        commit('SET_BUYER_STATS_TOTALS', response.data.totals)
        commit('SET_BUYER_STATS_CLIENTS_LEADS', response.data.leads)
      }).finally(() => {
        commit('RESET_BUYER_STATS_CLIENTS_FETCH_LOADING')
      })
  }
}

const mutations = {
  SET_BUYER_STATS_CLIENTS: (state, buyerClients) => (state.buyer_stats_clients = buyerClients),
  SET_BUYER_STATS_CLIENTS_LEADS: (state, leads) => (state.buyer_stats_clients_leads = leads)
}

export default {
  state,
  getters,
  actions,
  mutations,
  modules
}
