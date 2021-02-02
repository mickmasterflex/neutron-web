import axios from '@/axios'

const state = {
  current_buyer_stats_offer_contract: {},
  offer_contract_stats_leads: [],
  offer_contract_stats_totals: {}
}

const getters = {
  getCurrentBuyerStatsOffer: state => state.current_buyer_stats_offer_contract,
  // getOfferContractStatsTotalLeadCount: state => state.offer_contract_stats_totals.lead_count,
  // getOfferContractStatsTotalSoldCount: state => state.offer_contract_stats_totals.sold_count,
  // getOfferContractStatsTotalRevenue: state => state.offer_contract_stats_totals.revenue,
  // getOfferContractStatsTotalMargin: state => state.offer_contract_stats_totals.margin,
  // getOfferContractStatsTotalPayout: state => state.offer_contract_stats_totals.payout,
  // getOfferContractStatsTotalScrubRate: state => state.offer_contract_stats_totals.scrub_rate,
  // getOfferContractStatsTotalMarginPercent: state => state.offer_contract_stats_totals.margin_percent,
  getOfferContractStatsLeads: state => state.offer_contract_stats_leads
}

const actions = {
  async fetchOfferContractStats ({ commit, getters }, id) {
    // commit('SET_BUYER_CLIENT_STATS_FETCH_LOADING')
    await axios.get(`/analytics/leads/?${getters.getAnalyticsDateRangeUrlFormatted}&offer_contract=${id}`)
      .then(response => {
        commit('SET_OFFER_CONTRACT_STATS_TOTALS', response.data.totals)
        commit('SET_OFFER_CONTRACT_STATS_LEADS', response.data.leads)
        commit('SET_CURRENT_BUYER_STATS_OFFER_CONTRACT', response.data.offer_contract)
        commit('SET_CURRENT_BUYER_STATS_CONTRACT', response.data.contract)
        commit('SET_CURRENT_BUYER_STATS_CLIENT', response.data.client)
      }).finally(() => {
        // commit('RESET_OFFER_CONTRACT_STATS_FETCH_LOADING')
      })
  }
}

const mutations = {
  SET_CURRENT_BUYER_STATS_OFFER_CONTRACT: (state, offer) => (state.current_buyer_stats_offer_contract = offer),
  SET_OFFER_CONTRACT_STATS_TOTALS: (state, totals) => (state.offer_contract_stats_totals = totals),
  SET_OFFER_CONTRACT_STATS_LEADS: (state, leads) => (state.offer_contract_stats_leads = leads)
}

export default {
  state,
  getters,
  actions,
  mutations
}
