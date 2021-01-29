import axios from '@/axios'
import loading from '@/store/modules/analytics/buyer-stats/clients/loading'

const modules = {
  loading
}

const state = {
  buyer_clients: {},
  buyer_clients_leads: {},
  buyer_clients_totals: {},
  current_buyer_client: {}
}

const getters = {
  getCurrentBuyerClient: state => state.current_buyer_client,
  getBuyerClients: state => state.buyer_clients,
  getBuyerClientsTotalLeadCount: state => state.buyer_clients_totals.lead_count,
  getBuyerClientsTotalSoldCount: state => state.buyer_clients_totals.sold_count,
  getBuyerClientsTotalRevenue: state => state.buyer_clients_totals.revenue,
  getBuyerClientsTotalMargin: state => state.buyer_clients_totals.margin,
  getBuyerClientsTotalPayout: state => state.buyer_clients_totals.payout,
  getBuyerClientsTotalScrubRate: state => state.buyer_clients_totals.scrub_rate,
  getBuyerClientsTotalMarginPercent: state => state.buyer_clients_totals.margin_percent,
  getBuyerClientsLeads: state => state.buyer_clients_leads
}

const actions = {
  async fetchBuyerClientStats ({ commit, getters }) {
    commit('SET_BUYER_CLIENTS_FETCH_LOADING')
    await axios.get(`/analytics/buyer-clients/?${getters.getAnalyticsDateRangeUrlFormatted}`)
      .then(response => {
        commit('SET_BUYER_CLIENTS', response.data.buyer_clients)
        commit('SET_BUYER_CLIENTS_TOTALS', response.data.totals)
        commit('SET_BUYER_CLIENTS_LEADS', response.data.leads)
      }).finally(() => {
        commit('RESET_BUYER_CLIENTS_FETCH_LOADING')
      })
  }
}

const mutations = {
  SET_CURRENT_BUYER_CLIENT: (state, buyerClient) => (state.current_buyer_client = buyerClient),
  SET_BUYER_CLIENTS: (state, buyerClients) => (state.buyer_clients = buyerClients),
  SET_BUYER_CLIENTS_TOTALS: (state, totals) => (state.buyer_clients_totals = totals),
  SET_BUYER_CLIENTS_LEADS: (state, leads) => (state.buyer_clients_leads = leads)
}

export default {
  state,
  getters,
  actions,
  mutations,
  modules
}
