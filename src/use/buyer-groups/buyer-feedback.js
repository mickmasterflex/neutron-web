import { computed, reactive, inject } from '@vue/composition-api'

export default function useBuyerFeedback (buyerId, computedState, checkboxState) {
  const store = inject('vuex-store')

  const state = reactive({
    buyer: computed(() => store.getters.getBuyerById(buyerId))
  })

  const userFeedbackState = reactive({
    conflictingBuyerGroup: computed(
      () => computedState.isBuyerInOtherGroup
    ),
    descendantsInAnotherGroup: computed(
      () => computedState.descendantsInAnotherGroupCount > 0
    ),
    inheritsBuyerGroup: computed(
      () => state.buyer.ancestor_buyer_group !== null
    ),
    childrenAssignedSelfUnassigned: computed(
      () => checkboxState.checkedImplied && state.buyer.ancestor_buyer_group === null
    ),
    hasUserFeedback: computed(
      () => {
        return userFeedbackState.conflictingBuyerGroup ||
          userFeedbackState.descendantsInAnotherGroup ||
          userFeedbackState.inheritsBuyerGroup ||
          userFeedbackState.childrenAssignedSelfUnassigned
      }
    )
  })
  return {
    userFeedbackState
  }
}
