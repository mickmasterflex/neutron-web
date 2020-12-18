import axios from '@/axios'

const state = {
  current_buyer_group_relationship_data: null
}

const getters = {
  getCurrentBuyerGroupRelationshipData: state => state.current_buyer_group_relationship_data
}

const actions = {
  async updateBuyerGroupForBuyer ({ commit, dispatch, getters }, updatedBuyer) {
    await axios.put(`/buyers/${updatedBuyer.id}/`, updatedBuyer)
      .then(response => {
        commit('UPDATE_BUYER', response.data)

        let buyerGroupAncestorData = null
        if (response.data.buyer_group) {
          const buyerGroup = getters.getBuyerGroupById(response.data.buyer_group)
          buyerGroupAncestorData = {
            buyer_group: buyerGroup[0].id,
            buyer_group_name: buyerGroup[0].name,
            contract: response.data.id
          }
        }

        const children = response.data.children
        commit('SET_CURRENT_BUYER_GROUP_RELATIONSHIP_DATA', buyerGroupAncestorData)

        if (children) {
          dispatch('updateBuyerChildrenInheritedGroup', children)
        }

        if (response.data.parent) {
          if (buyerGroupAncestorData) {
            dispatch('addBuyerParentDescendant', response.data.parent)

            if (response.data.descendants.length > 0) {
              dispatch('removeBuyerParentDescendants', { buyer: response.data.parent, descendants: response.data.descendants })
            }
          } else {
            dispatch('removeBuyerGroupDescendant', { buyer: response.data.parent, descendant: updatedBuyer.id })
          }
        }
      })
  },
  async updateBuyerChildrenInheritedGroup ({ commit, dispatch, getters }, children) {
    children.forEach(childId => {
      const buyer = getters.getBuyerById(childId)
      buyer.inherited_buyer_group = getters.getCurrentBuyerGroupRelationshipData
      buyer.buyer_group = null
      dispatch('removeAllBuyerGroupDescendants', buyer.id)
      commit('UPDATE_BUYER', buyer)
      if (buyer.children) {
        dispatch('updateBuyerChildrenInheritedGroup', buyer.children)
      }
    })
  },
  async removeAllBuyerGroupDescendants ({ commit, dispatch, getters }, buyerId) {
    const buyer = getters.getBuyerById(buyerId)
    buyer.descendant_buyer_groups = []
    commit('UPDATE_BUYER', buyer)
  },
  async removeBuyerGroupDescendant ({ commit, dispatch, getters }, ids) {
    const buyer = getters.getBuyerById(ids.buyer)
    buyer.descendant_buyer_groups = buyer.descendant_buyer_groups.filter(d => d.contract !== ids.descendant)
    commit('UPDATE_BUYER', buyer)
    if (buyer.parent) {
      dispatch('removeBuyerGroupDescendant', { buyer: buyer.parent, descendant: ids.descendant })
    }
  },
  async addBuyerParentDescendant ({ commit, dispatch, getters }, buyerId) {
    const buyer = getters.getBuyerById(buyerId)
    buyer.descendant_buyer_groups.push(getters.getCurrentBuyerGroupRelationshipData)
    commit('UPDATE_BUYER', buyer)
    if (buyer.parent) {
      dispatch('addBuyerParentDescendant', buyer.parent)
    }
  },
  async removeBuyerParentDescendants ({ commit, dispatch, getters }, ids) {
    const buyer = getters.getBuyerById(ids.buyer)
    buyer.descendant_buyer_groups = buyer.descendant_buyer_groups.filter(d => !ids.descendants.includes(d.contract))
    commit('UPDATE_BUYER', buyer)
    if (buyer.parent) {
      dispatch('removeBuyerParentDescendants', { buyer: buyer.parent, descendants: ids.descendants })
    }
  }
}

const mutations = {
  SET_CURRENT_BUYER_GROUP_RELATIONSHIP_DATA: (state, inheritedBuyerGroup) => {
    state.current_buyer_group_relationship_data = inheritedBuyerGroup
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
