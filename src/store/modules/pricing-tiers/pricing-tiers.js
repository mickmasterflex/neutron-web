import axios from '@/axios'

const state = {
  pricing_tiers: [],
  current_pricing_tiers: [],
  created_pricing_tiers: [],
  modified_pricing_tiers: [],
  deleted_pricing_tiers: []
}

const getters = {
  getPricingTiers: state => state.pricing_tiers,
  getPricingTiersByGroup: (state) => (groupId) => {
    return state.pricing_tiers.filter(tier => tier.pricing_tier_group === groupId)
  },
  getCurrentPricingTiers: state => state.current_pricing_tier_group
}

const actions = {
  async fetchPricingTiers () {
    await axios.get('/pricing-tier-groups/')
  },
  async createPricingTiers () {
    await state.created_pricing_tiers.forEach(tier => {
      axios.put('/pricing-tiers/', tier, { showSuccessToast: false })
    })
  },
  async updatePricingTiers () {
    await state.modified_pricing_tiers.forEach(tier => {
      axios.put(`/pricing-tiers/${tier.id}`, tier, { showSuccessToast: false })
    })
  },
  async deletePricingTiers () {
    await state.deleted_pricing_tiers.forEach(tier => {
      axios.put(`/pricing-tiers/${tier.id}`, { showSuccessToast: false })
    })
  }
}

const mutations = {
  SET_PRICING_TIERS: (state, pricingTiers) => (state.pricing_tiers = pricingTiers),
  RESET_PRICING_TIERS: (state) => (state.pricing_tiers = []),
  SET_CURRENT_PRICING_TIERS: (state, pricingTiers) => (state.current_pricing_tiers = pricingTiers),
  RESET_CURRENT_PRICING_TIERS: (state) => (state.current_pricing_tiers = []),
  REMOVE_TIER_FROM_CURRENT_PRICING_TIERS: (state, id) => {
    state.current_pricing_tiers = state.current_pricing_tiers.filter(tier => tier.id === id)
  },
  REMOVE_TIER_FROM_MODIFIED_PRICING_TIERS: (state, id) => {
    state.modified_pricing_tiers = state.modified_pricing_tiers.filter(tier => tier.id === id)
  },
  ADD_PRICING_TIER_TO_CREATED: (state, createdTier) => {
    const index = state.created_pricing_tiers.findIndex(tier => tier.id === createdTier.id)
    if (index !== -1) {
      state.created_pricing_tiers.splice(index, 1, createdTier)
    } else {
      state.created_pricing_tiers.unshift(createdTier)
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
  ADD_PRICING_TIER_TO_DELETED: (state, deletedTier) => {
    const index = state.deleted_pricing_tiers.findIndex(tier => tier.id === deletedTier.id)
    if (index !== -1) {
      state.deleted_pricing_tiers.splice(index, 1, deletedTier)
    } else {
      state.deleted_pricing_tiers.unshift(deletedTier)
    }
  },
  RESET_CREATED_PRICING_TIERS: (state) => (state.created_pricing_tiers = []),
  RESET_MODIFIED_PRICING_TIERS: (state) => (state.modified_pricing_tiers = []),
  RESET_DELETED_PRICING_TIERS: (state) => (state.deleted_pricing_tiers = [])
}

export default {
  state,
  getters,
  actions,
  mutations
}
