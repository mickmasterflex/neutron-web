import axios from '@/axios'

const state = {
  pricing_tier_groups: undefined,
  current_pricing_tier_group: {}
}

const getters = {
  getPricingTierGroups: state => state.pricing_tier_groups,
  getCurrentPricingTierGroup: state => state.current_pricing_tier_group,
  getPricingTierGroupById: (state) => (id) => { return state.pricing_tier_groups.find(group => group.id === id) }
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
        commit('SET_CURRENT_PRICING_TIER_GROUP_FORM', response.data)
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
  },
  async updateGroupTiers ({ commit, getters }, payload) {
    const index = getters.getPricingTierGroups.findIndex(group => group.id === payload.groupId)
    const updatedGroup = getters.getPricingTierGroups[index]
    updatedGroup.pricingtier_set = payload.tiers
    commit('UPDATE_PRICING_TIER_GROUP', updatedGroup)
  }
}

const mutations = {
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
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
