import axios from '@/axios'

const state = {
  current_pricing_tiers: {}
}

const getters = {
  getCurrentPricingTiers: state => state.current_pricing_tiers
}
const actions = {
  async createPricingTier ({ commit }, data) {
    await axios.post('/pricing-tiers/', data)
      .then(response => {
        commit('ADD_PRICING_TIER', response.data)
      })
  },
  async deletePricingTier ({ commit }, id) {
    await axios.delete(`/pricing-tiers/${id}/`)
      .then(() => {
        commit('REMOVE_PRICING_TIER', id)
      })
  }
}

const mutations = {
  SET_CURRENT_PRICING_TIERS: (state, tier) => (state.current_pricing_tiers = tier),
  RESET_CURRENT_PRICING_TIERS: (state) => (state.current_pricing_tiers = {}),
  ADD_PRICING_TIER: (state, tier) => state.current_pricing_tiers.unshift(tier),
  REMOVE_PRICING_TIER: (state, id) => (state.current_pricing_tiers = state.current_pricing_tiers.filter(tier => tier.id !== id))
}

export default {
  state,
  getters,
  actions,
  mutations
}
