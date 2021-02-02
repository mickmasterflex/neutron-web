import allBuyerClients from '@/store/modules/analytics/buyer-stats/clients'
import buyerClient from '@/store/modules/analytics/buyer-stats/client'
import buyerContract from '@/store/modules/analytics/buyer-stats/buyer-contract'
import offerContract from '@/store/modules/analytics/buyer-stats/offer-contract'

const state = {
  buyer_stats_totals: {}
}

const getters = {
  getBuyerStatsTotalLeadCount: state => state.buyer_stats_totals.lead_count,
  getBuyerStatsTotalSoldCount: state => state.buyer_stats_totals.sold_count,
  getBuyerStatsTotalRevenue: state => state.buyer_stats_totals.revenue,
  getBuyerStatsTotalMargin: state => state.buyer_stats_totals.margin,
  getBuyerStatsTotalPayout: state => state.buyer_stats_totals.payout,
  getBuyerStatsTotalScrubRate: state => state.buyer_stats_totals.scrub_rate,
  getBuyerStatsTotalMarginPercent: state => state.buyer_stats_totals.margin_percent
}

const mutations = {
  SET_BUYER_STATS_TOTALS: (state, totals) => (state.buyer_stats_totals = totals),
  RESET_BUYER_STATS_TOTALS: (state) => (state.buyer_stats_totals = {})
}

const modules = {
  allBuyerClients,
  buyerClient,
  buyerContract,
  offerContract
}

export default {
  state,
  getters,
  mutations,
  modules
}
