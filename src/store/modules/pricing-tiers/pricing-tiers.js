import axios from '@/axios'

const state = {
  current_pricing_tiers: {},
  show_update_pricing_tier_modal: false
}

const getters = {
  getCurrentPricingTiers: state => state.current_pricing_tiers,
  getShowUpdatePricingTierModal: state => state.show_update_pricing_tier_modal
}
const actions = {
  async fetchPricingTiers ({ commit }) {
    await axios.get('/pricing-tiers/')
      .then(response => {
        commit('SET_PRICING_TIERS', response.data)
      })
  },
  async createPricingTier ({ commit }, data) {
    await axios.post('/pricing-tiers/', data)
      .then(response => {
        commit('ADD_PRICING_TIER', response.data)
      })
  },
  async updatePricingTier ({ commit }, data) {
    await axios.put(`/pricing-tiers/${data.id}/`, data)
      .then(response => {
        commit('UPDATE_PRICING_TIER', response.data)
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
  SHOW_UPDATE_PRICING_TIER_MODAL: (state) => (state.show_update_pricing_tier_modal = true),
  CLOSE_UPDATE_PRICING_TIER_MODAL: (state) => (state.show_update_pricing_tier_modal = false),
  SET_CURRENT_PRICING_TIERS: (state, tier) => (state.current_pricing_tiers = tier),
  RESET_CURRENT_PRICING_TIERS: (state) => (state.current_pricing_tiers = {}),
  ADD_PRICING_TIER: (state, tier) => state.current_pricing_tiers.unshift(tier),
  REMOVE_PRICING_TIER: (state, id) => (state.current_pricing_tiers = state.current_pricing_tiers.filter(tier => tier.id !== id)),
  UPDATE_PRICING_TIER: (state, updatedTier) => {
    const index = state.current_pricing_tiers.findIndex(tier => tier.id === updatedTier.id)
    if (index !== -1) {
      state.current_pricing_tiers.splice(index, 1, updatedTier)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
