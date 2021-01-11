
const state = {
  pricing_tier_groups_fetch_loading: false,
  pricing_tier_groups_fetch_loading_text: 'Loading Pricing Tier Groups'
}

const getters = {
  getPricingTierGroupsFetchLoading: state => state.pricing_tier_groups_fetch_loading,
  getPricingTierGroupsFetchLoadingText: state => state.pricing_tier_groups_fetch_loading_text
}

const mutations = {
  SET_PRICING_TIER_GROUPS_FETCH_LOADING: (state) => (state.pricing_tier_groups_fetch_loading = true),
  RESET_PRICING_TIER_GROUPS_FETCH_LOADING: (state) => (state.pricing_tier_groups_fetch_loading = false)
}

export default {
  state,
  getters,
  mutations
}
