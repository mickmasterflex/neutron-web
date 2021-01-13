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

        let buyerGroupRelationshipData = null
        if (response.data.buyer_group) {
          const buyerGroup = getters.getBuyerGroupById(response.data.buyer_group)
          buyerGroupRelationshipData = {
            buyer_group: buyerGroup[0].id,
            buyer_group_name: buyerGroup[0].name,
            contract: response.data.id
          }
        }
        commit('SET_CURRENT_BUYER_GROUP_RELATIONSHIP_DATA', buyerGroupRelationshipData)

        const children = response.data.children
        if (children) {
          dispatch('updateBuyerChildrenInheritedGroup', children)
        }

        const parent = response.data.parent
        if (parent) {
          if (buyerGroupRelationshipData) {
            // when a buyer_group was added to buyer,
            // we add that buyer to parent's descendant_buyer_groups
            dispatch('addDescendantBuyerGroup', parent)

            if (response.data.descendants.length > 0) {
              // when a buyer_group was added to buyer,
              // and that buyer has descendants,
              // we remove those descendants from parent's descendant_buyer_groups
              dispatch('removeDescendantsFromDescendantBuyerGroups', { buyer: parent, descendants: response.data.descendants })
            }
          } else {
            // when a buyer_group was removed from a buyer,
            // we remove that buyer from parent's descendant_buyer_groups
            dispatch('removeDescendantBuyerGroup', { buyer: parent, descendant: updatedBuyer.id })
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
  async removeDescendantBuyerGroup ({ commit, dispatch, getters }, ids) {
    const buyer = getters.getBuyerById(ids.buyer)
    buyer.descendant_buyer_groups = buyer.descendant_buyer_groups.filter(d => d.contract !== ids.descendant)
    commit('UPDATE_BUYER', buyer)
    if (buyer.parent) {
      dispatch('removeDescendantBuyerGroup', { buyer: buyer.parent, descendant: ids.descendant })
    }
  },
  async addDescendantBuyerGroup ({ commit, dispatch, getters }, buyerId) {
    const buyer = getters.getBuyerById(buyerId)
    buyer.descendant_buyer_groups.push(getters.getCurrentBuyerGroupRelationshipData)
    commit('UPDATE_BUYER', buyer)
    if (buyer.parent) {
      dispatch('addDescendantBuyerGroup', buyer.parent)
    }
  },
  async removeDescendantsFromDescendantBuyerGroups ({ commit, dispatch, getters }, ids) {
    const buyer = getters.getBuyerById(ids.buyer)
    buyer.descendant_buyer_groups = buyer.descendant_buyer_groups.filter(d => !ids.descendants.includes(d.contract))
    commit('UPDATE_BUYER', buyer)
    if (buyer.parent) {
      dispatch('removeDescendantsFromDescendantBuyerGroups', { buyer: buyer.parent, descendants: ids.descendants })
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
