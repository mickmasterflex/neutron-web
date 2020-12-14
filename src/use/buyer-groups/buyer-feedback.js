import { computed, reactive } from '@vue/composition-api'

export default function useBuyerFeedback (obj, computedState, checkboxState, store) {
  const userFeedbackState = reactive({
    conflictingBuyerGroup: computed(
      () => store.getters.getBuyerGroupById(obj.buyer_group)[0]
    ),
    descendantsInAnotherGroup: computed(
      () => computedState.descendantsInAnotherGroupCount > 0
    ),
    inheritsBuyerGroup: computed(
      () => obj.inherited_buyer_group !== null
    ),
    descendantsAssignedSelfUnassigned: computed(
      () => checkboxState.checkedImplied
    ),
    hasUserFeedback: computed(
      () => {
        return userFeedbackState.conflictingBuyerGroup ||
          userFeedbackState.descendantsInAnotherGroup ||
          userFeedbackState.inheritsBuyerGroup ||
          userFeedbackState.descendantsAssignedSelfUnassigned
      }
    )
  })
  return {
    userFeedbackState
  }
}
