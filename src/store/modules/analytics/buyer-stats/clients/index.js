import axios from '@/axios'
import loading from '@/store/modules/analytics/buyer-stats/clients/loading'

const modules = {
  loading
}

const state = {
  buyer_stats_clients: {},
  buyer_stats_clients_leads: {},
  buyer_stats_clients_totals: {},
  current_buyer_client: {}
}

const getters = {
  getCurrentBuyerStatsClient: state => state.current_buyer_client,
  getBuyerStatsClients: state => state.buyer_stats_clients,
  getBuyerStatsClientsTotalLeadCount: state => state.buyer_stats_clients_totals.lead_count,
  getBuyerStatsClientsTotalSoldCount: state => state.buyer_stats_clients_totals.sold_count,
  getBuyerStatsClientsTotalRevenue: state => state.buyer_stats_clients_totals.revenue,
  getBuyerStatsClientsTotalMargin: state => state.buyer_stats_clients_totals.margin,
  getBuyerStatsClientsTotalPayout: state => state.buyer_stats_clients_totals.payout,
  getBuyerStatsClientsTotalScrubRate: state => state.buyer_stats_clients_totals.scrub_rate,
  getBuyerStatsClientsTotalMarginPercent: state => state.buyer_stats_clients_totals.margin_percent,
  getBuyerStatsClientsLeads: state => state.buyer_stats_clients_leads
}

const actions = {
  async fetchBuyerClientsStats ({ commit, getters }) {
    commit('SET_BUYER_STATS_CLIENTS_FETCH_LOADING')
    await axios.get(`/analytics/buyer-clients/?${getters.getAnalyticsDateRangeUrlFormatted}`)
      .then(response => {
        commit('SET_BUYER_STATS_CLIENTS', response.data.buyer_clients)
        commit('SET_BUYER_STATS_CLIENTS_TOTALS', response.data.totals)
        commit('SET_BUYER_STATS_CLIENTS_LEADS', response.data.leads)
      }).finally(() => {
        commit('RESET_BUYER_STATS_CLIENTS_FETCH_LOADING')
      })
  }
}

const mutations = {
  SET_CURRENT_BUYER_CLIENT: (state, buyerClient) => (state.current_buyer_client = buyerClient),
  SET_BUYER_STATS_CLIENTS: (state, buyerClients) => (state.buyer_stats_clients = buyerClients),
  SET_BUYER_STATS_CLIENTS_TOTALS: (state, totals) => (state.buyer_stats_clients_totals = totals),
  SET_BUYER_STATS_CLIENTS_LEADS: (state, leads) => (state.buyer_stats_clients_leads = leads)
}

export default {
  state,
  getters,
  actions,
  mutations,
  modules
}
