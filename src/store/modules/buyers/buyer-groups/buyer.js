import axios from '@/axios'

const state = {
  current_inherited_buyer_group: null
}

const getters = {
  getCurrentInheritedBuyerGroup: state => state.current_inherited_buyer_group
}

const actions = {
  async updateBuyerGroupForBuyer ({ commit, dispatch, getters }, updatedBuyer) {
    await axios.put(`/buyers/${updatedBuyer.id}/`, updatedBuyer)
      .then(response => {
        commit('UPDATE_BUYER', response.data)

        const children = response.data.children
        if (children) {
          let inheritedBuyerGroup = null
          if (response.data.buyer_group) {
            const buyerGroup = getters.getBuyerGroupById(response.data.buyer_group)
            inheritedBuyerGroup = {
              buyer_group: buyerGroup[0].id,
              buyer_group_name: buyerGroup[0].name,
              contract: response.data.id
            }
          }
          commit('SET_CURRENT_INHERITED_BUYER_GROUP', inheritedBuyerGroup)
          dispatch('updateBuyerChildrenInheritedGroup', children)
        }
      })
  },
  async updateBuyerChildrenInheritedGroup ({ commit, dispatch, getters }, children) {
    children.forEach(childId => {
      const buyer = getters.getBuyerById(childId)
      buyer.inherited_buyer_group = getters.getCurrentInheritedBuyerGroup
      buyer.buyer_group = null
      commit('UPDATE_BUYER', buyer)
      if (buyer.children) {
        dispatch('updateBuyerChildrenInheritedGroup', buyer.children)
      }
    })
  }
}

const mutations = {
  SET_CURRENT_INHERITED_BUYER_GROUP: (state, inheritedBuyerGroup) => {
    state.current_inherited_buyer_group = inheritedBuyerGroup
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
