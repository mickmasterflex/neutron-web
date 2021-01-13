import axios from '@/axios'
import buyer from '@/store/modules/buyer-groups/buyer'
import loading from '@/store/modules/buyer-groups/loading'
import visibility from '@/store/modules/buyer-groups/visibility'

const modules = {
  buyer,
  loading,
  visibility
}

const state = {
  buyer_groups: undefined,
  current_buyer_group: {}
}

const getters = {
  getBuyerGroups: state => state.buyer_groups,
  getCurrentBuyerGroup: state => state.current_buyer_group,
  getBuyerGroupById: (state) => (id) => state.buyer_groups.filter(group => group.id === id)
}

const actions = {
  async fetchBuyerGroups ({ commit }) {
    commit('SET_BUYER_GROUPS_FETCH_LOADING')
    await axios.get('/buyer-groups/')
      .then(response => {
        commit('SET_BUYER_GROUPS', response.data)
        commit('RESET_BUYER_GROUPS_FETCH_LOADING')
      })
  },
  async createBuyerGroup ({ commit }, buyerGroup) {
    await axios.post('/buyer-groups/', buyerGroup)
      .then(response => {
        commit('ADD_BUYER_GROUP', response.data)
        commit('SET_CURRENT_BUYER_GROUP', response.data)
      })
  },
  async updateBuyerGroup ({ commit }, buyerGroup) {
    await axios.put(`/buyer-groups/${buyerGroup.id}/`, buyerGroup)
      .then(response => {
        commit('UPDATE_BUYER_GROUP', response.data)
      })
  },
  async deleteBuyerGroup ({ commit }, id) {
    await axios.delete(`/buyer-groups/${id}/`)
      .then(() => {
        commit('REMOVE_BUYER_GROUP', id)
      })
  }
}

const mutations = {
  SET_BUYER_GROUPS: (state, groups) => (state.buyer_groups = groups),
  ADD_BUYER_GROUP: (state, group) => state.buyer_groups.unshift(group),
  UPDATE_BUYER_GROUP: (state, updatedGroup) => {
    const index = state.buyer_groups.findIndex(group => group.id === updatedGroup.id)
    if (index !== -1) {
      state.buyer_groups.splice(index, 1, updatedGroup)
    }
  },
  SET_CURRENT_BUYER_GROUP: (state, group) => (state.current_buyer_group = group),
  RESET_CURRENT_BUYER_GROUP: (state) => (state.current_buyer_group = {}),
  REMOVE_BUYER_GROUP: (state, id) => (state.buyer_groups = state.buyer_groups.filter(group => group.id !== id))
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
