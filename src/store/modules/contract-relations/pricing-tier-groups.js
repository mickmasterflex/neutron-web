const state = {
  show_list_pricing_tier_group_modal: false
}

const getters = {
  getShowRelationPricingTierGroupModal: state => state.show_list_pricing_tier_group_modal
}

const mutations = {
  SHOW_RELATION_PRICING_TIER_GROUP_MODAL: (state) => (state.show_list_pricing_tier_group_modal = true),
  CLOSE_RELATION_PRICING_TIER_GROUP_MODAL: (state) => (state.show_list_pricing_tier_group_modal = false)
}

export default {
  state,
  getters,
  mutations
}
