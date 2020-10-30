const state = {
  show_update_pricing_tier_group_modal: false,
  show_create_pricing_tier_group_form: false
}

const getters = {
  getShowUpdatePricingTierGroupModal: state => state.show_update_pricing_tier_group_modal,
  getShowCreatePricingTierGroupForm: state => state.show_create_pricing_tier_group_form
}

const mutations = {
  SHOW_UPDATE_PRICING_TIER_GROUP_MODAL: (state) => (state.show_update_pricing_tier_group_modal = true),
  CLOSE_UPDATE_PRICING_TIER_GROUP_MODAL: (state) => (state.show_update_pricing_tier_group_modal = false),
  SHOW_CREATE_PRICING_TIER_GROUP_FORM: (state) => (state.show_create_pricing_tier_group_form = true),
  CLOSE_CREATE_PRICING_TIER_GROUP_FORM: (state) => (state.show_create_pricing_tier_group_form = false)
}

export default {
  state,
  getters,
  mutations
}
