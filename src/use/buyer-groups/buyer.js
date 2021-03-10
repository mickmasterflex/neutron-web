import { computed, reactive } from '@vue/composition-api'

export default function useBuyer (buyerId, currentBuyerGroupId, store) {
  const checkboxState = reactive({
    checked: computed(() => {
      if (computedState.isBuyerInGroup) {
        return true
      } else return checkboxState.checkedImplied
    }),
    checkedImplied: computed(
      () => computedState.buyerInheritsCurrentBuyerGroup ||
        (state.children.length > 0 && computedState.areAllChildrenInGroup)
    ),
    disabled: computed(
      () => computedState.descendantsInAnotherGroupCount > 0 ||
        state.buyer.ancestor_buyer_groups !== null
    ),
    indeterminate: computed(
      () => !checkboxState.checked &&
        (computedState.childrenInGroup.length > 0 ||
          computedState.descendantsInCurrentGroup.length > 0)
    )
  })
  const computedState = reactive({
    isBuyerInGroup: computed(
      () => state.buyer.buyer_group === currentBuyerGroupId.value
    ),
    isBuyerInOtherGroup: computed(
      () => state.buyer.buyer_group !== null &&
        state.buyer.buyer_group !== currentBuyerGroupId.value
    ),
    childrenInGroup: computed(
      () => state.children.filter(b => b.buyer_group === currentBuyerGroupId.value)
    ),
    areAllChildrenInGroup: computed(
      () => state.children.length === computedState.childrenInGroup.length
    ),
    descendantsInCurrentGroup: computed(
      () => state.buyer.descendant_buyer_groups.filter(b => b.buyer_group === currentBuyerGroupId.value)
    ),
    descendantsInAnotherGroupCount: computed(
      () => state.buyer.descendant_buyer_groups.filter(b => b.buyer_group !== currentBuyerGroupId.value).length
    ),
    buyerInheritsCurrentBuyerGroup: computed(
      () => {
        if (state.buyer.ancestor_buyer_groups) {
          return state.buyer.ancestor_buyer_groups.buyer_group === currentBuyerGroupId.value
        }
      }
    )
  })
  const state = reactive({
    buyer: computed(
      () => store.getters.getBuyerById(buyerId)
    ),
    children: computed(
      () => store.getters.getBuyersByParent(buyerId)
    ),
    assignedBuyerGroup: computed(
      () => store.getters.getBuyerGroupById(state.buyer.buyer_group)[0]
    )
  })
  function saveBuyer () {
    const updatedBuyer = { ...state.buyer }
    if (computedState.isBuyerInOtherGroup || computedState.isBuyerInGroup) {
      updatedBuyer.buyer_group = null
    } else {
      updatedBuyer.buyer_group = currentBuyerGroupId.value
    }
    store.commit('SET_BUYER_GROUPS_LOADING')
    store.dispatch('updateBuyerGroupForBuyer', updatedBuyer).then(() => {
      store.commit('SET_CURRENT_BUYER_GROUP_RELATIONSHIP_DATA', null)
    }).finally(() => {
      store.commit('RESET_BUYER_GROUPS_LOADING')
    })
  }
  function check () {
    if (!checkboxState.disabled) {
      saveBuyer()
    }
  }
  return {
    check,
    checkboxState,
    computedState,
    state
  }
}
