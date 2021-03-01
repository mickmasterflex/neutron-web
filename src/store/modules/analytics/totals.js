const state = {
  analytics_totals: {}
}

const getters = {
  getAnalyticsTotalLeadCount: state => state.analytics_totals.lead_count,
  getAnalyticsTotalSoldCount: state => state.analytics_totals.sold_count,
  getAnalyticsTotalRevenue: state => state.analytics_totals.revenue,
  getAnalyticsTotalMargin: state => state.analytics_totals.margin,
  getAnalyticsTotalPayout: state => state.analytics_totals.payout,
  getAnalyticsTotalScrubRate: state => state.analytics_totals.scrub_rate,
  getAnalyticsTotalMarginPercent: state => state.analytics_totals.margin_percent
}

const mutations = {
  SET_ANALYTICS_TOTALS: (state, totals) => (state.analytics_totals = totals),
  RESET_ANALYTICS_TOTALS: (state) => (state.analytics_totals = {})
}

export default {
  state,
  getters,
  mutations
}
