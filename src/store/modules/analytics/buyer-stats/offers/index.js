import axios from '@/axios'
import loading from '@/store/modules/analytics/buyer-stats/offers/loading'

const modules = {
  loading
}

const state = {
  current_buyer_stats_offer: {},
  buyer_stats_offers: {},
  buyer_stats_offers_leads: {},
  buyer_stats_offers_totals: {}
}

const getters = {
  getCurrentBuyerStatsOffer: state => state.current_buyer_stats_offer,
  getBuyerStatsOffers: state => state.buyer_stats_offers,
  getBuyerStatsOffersTotalLeadCount: state => state.buyer_stats_offers_totals.lead_count,
  getBuyerStatsOffersTotalSoldCount: state => state.buyer_stats_offers_totals.sold_count,
  getBuyerStatsOffersTotalRevenue: state => state.buyer_stats_offers_totals.revenue,
  getBuyerStatsOffersTotalMargin: state => state.buyer_stats_offers_totals.margin,
  getBuyerStatsOffersTotalPayout: state => state.buyer_stats_offers_totals.payout,
  getBuyerStatsOffersTotalScrubRate: state => state.buyer_stats_offers_totals.scrub_rate,
  getBuyerStatsOffersTotalMarginPercent: state => state.buyer_stats_offers_totals.margin_percent,
  getBuyerStatsOffersLeads: state => state.buyer_stats_offers_leads
}

const actions = {
  async fetchBuyerOffersStats ({ commit, getters }, id) {
    commit('SET_BUYER_STATS_OFFERS_FETCH_LOADING')
    await axios.get(`/analytics/offer-contracts/?${getters.getAnalyticsDateRangeUrlFormatted}&buyer_contract=${id}`)
      .then(response => {
        commit('SET_BUYER_STATS_OFFERS', response.data.offer_contracts)
        commit('SET_BUYER_STATS_OFFERS_TOTALS', response.data.totals)
        commit('SET_BUYER_STATS_OFFERS_LEADS', response.data.leads)
      }).finally(() => {
        commit('RESET_BUYER_STATS_OFFERS_FETCH_LOADING')
      })
  }
}

const mutations = {
  SET_CURRENT_BUYER_STATS_OFFER: (state, offer) => (state.current_buyer_stats_offer = offer),
  RESET_CURRENT_BUYER_STATS_OFFER: (state) => (state.current_buyer_stats_offer = {}),
  SET_BUYER_STATS_OFFERS: (state, buyerOffers) => (state.buyer_stats_offers = buyerOffers),
  SET_BUYER_STATS_OFFERS_TOTALS: (state, totals) => (state.buyer_stats_offers_totals = totals),
  SET_BUYER_STATS_OFFERS_LEADS: (state, leads) => (state.buyer_stats_offers_leads = leads)
}

export default {
  state,
  getters,
  actions,
  mutations,
  modules
}
