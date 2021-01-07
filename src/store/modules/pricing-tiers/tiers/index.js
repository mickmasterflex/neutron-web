import axios from '@/axios'

const state = {
  current_pricing_tiers: {}
}

const getters = {
  getCurrentPricingTiers: state => state.current_pricing_tiers
}
const actions = {
  async createPricingTier ({ commit, dispatch, getters }, data) {
    await axios.post('/pricing-tiers/', data)
      .then(response => {
        commit('ADD_PRICING_TIER', response.data)
        commit('SORT_PRICING_TIERS')
      })
    await dispatch('updateGroupTiers', { groupId: data.pricing_tier_group, tiers: getters.getCurrentPricingTiers })
  },
  async deletePricingTier ({ commit, dispatch, getters }, tier) {
    await axios.delete(`/pricing-tiers/${tier.id}/`)
      .then(() => {
        commit('REMOVE_PRICING_TIER', tier.id)
      })
    await dispatch('updateGroupTiers', { groupId: tier.pricing_tier_group, tiers: getters.getCurrentPricingTiers })
  }
}

const mutations = {
  SET_CURRENT_PRICING_TIERS: (state, tier) => (state.current_pricing_tiers = tier),
  RESET_CURRENT_PRICING_TIERS: (state) => (state.current_pricing_tiers = {}),
  ADD_PRICING_TIER: (state, tier) => state.current_pricing_tiers.unshift(tier),
  REMOVE_PRICING_TIER: (state, id) => (state.current_pricing_tiers = state.current_pricing_tiers.filter(tier => tier.id !== id)),
  SORT_PRICING_TIERS: (state) => {
    function compare (a, b) {
      const tierA = a.lower_bound
      const tierB = b.lower_bound
      let comparison = 0
      if (tierA > tierB) {
        comparison = 1
      } else if (tierA < tierB) {
        comparison = -1
      }
      return comparison
    }
    state.current_pricing_tiers.sort(compare)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
