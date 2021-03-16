import axios from '@/axios'

const state = {
  partner_stats_clients: [],
  partner_stats_clients_fetch_loading_text: 'Loading Partner Clients Data'
}

const getters = {
  getPartnerStatsClients: state => state.partner_stats_clients
}

const actions = {
  async fetchPartnerClientsStats ({ commit, getters, state }) {
    commit('SET_ANALYTICS_FETCH_LOADING_TEXT', state.partner_stats_clients_fetch_loading_text)
    commit('SET_ANALYTICS_FETCH_LOADING')
    await axios.get(`/analytics/partner-clients/?${getters.getAnalyticsDateRangeUrlFormatted}`)
      .then(response => {
        commit('SET_PARTNER_STATS_CLIENTS', response.data.clients)
        commit('SET_ANALYTICS_TOTALS', response.data.totals)
        commit('SET_ANALYTICS_LEADS', response.data.leads)
      }).finally(() => {
        commit('RESET_ANALYTICS_FETCH_LOADING')
      })
  },
  async fetchPartnerClientsStatsCSV ({ dispatch }) {
    dispatch('fetchAnalyticsStatsCSV', {
      filename: 'partnerClients',
      url: '/analytics/partner-clients/?'
    })
  }
}

const mutations = {
  SET_PARTNER_STATS_CLIENTS: (state, partnerClients) => (state.partner_stats_clients = partnerClients)
}

export default {
  state,
  getters,
  actions,
  mutations
}
