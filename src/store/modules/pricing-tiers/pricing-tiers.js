import axios from '@/axios'

const state = {
  current_pricing_tiers: {},
  show_update_pricing_tier_modal: false,
  modified_pricing_tiers: []
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
  async updatePricingTiers () {
    await state.modified_pricing_tiers.forEach(tier => {
      axios.put(`/pricing-tiers/${tier.id}/`, tier, { showSuccessToast: false })
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
  },
  ADD_PRICING_TIER_TO_MODIFIED: (state, modifiedTier) => {
    const index = state.modified_pricing_tiers.findIndex(tier => tier.id === modifiedTier.id)
    if (index !== -1) {
      state.modified_pricing_tiers.splice(index, 1, modifiedTier)
    } else {
      state.modified_pricing_tiers.unshift(modifiedTier)
    }
  },
  RESET_MODIFIED_PRICING_TIERS: (state) => (state.modified_pricing_tiers = [])
}

export default {
  state,
  getters,
  actions,
  mutations
}
