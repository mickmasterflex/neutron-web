import axios from '@/axios'

const state = {
  pricing_tier_groups: [],
  current_pricing_tier_group: {},
  show_update_pricing_tier_group_modal: false,
  show_create_pricing_tier_group_form: false
}

const getters = {
  getPricingTierGroups: state => state.pricing_tier_groups,
  getCurrentPricingTierGroup: state => state.current_pricing_tier_group,
  getShowUpdatePricingTierGroupModal: state => state.show_update_pricing_tier_group_modal,
  getPricingTierGroupById: (state) => (id) => { return state.pricing_tier_groups.find(group => group.id === id) },
  getShowCreatePricingTierGroupForm: state => state.show_create_pricing_tier_group_form
}

const actions = {
  async fetchPricingTierGroups ({ commit }) {
    await axios.get('/pricing-tier-groups/')
      .then(response => {
        commit('SET_PRICING_TIER_GROUPS', response.data)
        commit('SORT_PRICING_TIER_GROUPS', response.data)
      })
  },
  async createPricingTierGroup ({ commit }, data) {
    await axios.post('/pricing-tier-groups/', data)
      .then(response => {
        commit('ADD_PRICING_TIER_GROUP', response.data)
        commit('SORT_PRICING_TIER_GROUPS', response.data)
        commit('SET_CURRENT_PRICING_TIER_GROUP', response.data)
      })
  },
  async updatePricingTierGroup ({ commit }, data) {
    await axios.put(`/pricing-tier-groups/${data.id}/`, data)
      .then(response => {
        commit('UPDATE_PRICING_TIER_GROUP', response.data)
      })
  },
  async deletePricingTierGroup ({ commit }, id) {
    await axios.delete(`/pricing-tier-groups/${id}/`)
      .then(() => {
        commit('REMOVE_PRICING_TIER_GROUP', id)
      })
  }
}

const mutations = {
  SHOW_UPDATE_PRICING_TIER_GROUP_MODAL: (state) => (state.show_update_pricing_tier_group_modal = true),
  CLOSE_UPDATE_PRICING_TIER_GROUP_MODAL: (state) => (state.show_update_pricing_tier_group_modal = false),
  SET_PRICING_TIER_GROUPS: (state, groups) => (state.pricing_tier_groups = groups),
  SET_CURRENT_PRICING_TIER_GROUP: (state, group) => (state.current_pricing_tier_group = group),
  RESET_CURRENT_PRICING_TIER_GROUP: (state) => (state.current_pricing_tier_group = {}),
  ADD_PRICING_TIER_GROUP: (state, group) => state.pricing_tier_groups.unshift(group),
  REMOVE_PRICING_TIER_GROUP: (state, id) => (state.pricing_tier_groups = state.pricing_tier_groups.filter(group => group.id !== id)),
  UPDATE_PRICING_TIER_GROUP: (state, updatedGroup) => {
    const index = state.pricing_tier_groups.findIndex(group => group.id === updatedGroup.id)
    if (index !== -1) {
      state.pricing_tier_groups.splice(index, 1, updatedGroup)
    }
  },
  SORT_PRICING_TIER_GROUPS: (state) => {
    function compare (a, b) {
      const groupA = a.name.toUpperCase()
      const groupB = b.name.toUpperCase()
      let comparison = 0
      if (groupA > groupB) {
        comparison = 1
      } else if (groupA < groupB) {
        comparison = -1
      }
      return comparison
    }
    state.pricing_tier_groups.sort(compare)
  },
  CLOSE_CREATE_PRICING_TIER_GROUP: (state) => (state.show_create_pricing_tier_group_form = false),
  SHOW_CREATE_PRICING_TIER_GROUP_FORM: (state) => (state.show_create_pricing_tier_group_form = true)
}

export default {
  state,
  getters,
  actions,
  mutations
}
