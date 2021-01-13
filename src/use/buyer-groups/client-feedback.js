import { computed, reactive } from '@vue/composition-api'

export default function useClientFeedback (state) {
  const userFeedbackState = reactive({
    clientHasNoChildren: computed(
      () => state.children.length === 0
    ),
    hasUserFeedback: computed(
      () => {
        return userFeedbackState.clientHasNoChildren
      }
    )
  })
  return {
    userFeedbackState
  }
}
