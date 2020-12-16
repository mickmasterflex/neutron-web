import { computed, ref, reactive } from '@vue/composition-api'

export default function useExpandTr (hasChildren, userFeedbackState) {
  const expandedState = reactive({
    expanded: ref(false),
    expandable: computed(() => {
      return hasChildren || userFeedbackState.hasUserFeedback
    })
  })

  function toggleTrExpanded () {
    if (expandedState.expandable) {
      expandedState.expanded = !expandedState.expanded
    }
  }

  return {
    expandedState,
    toggleTrExpanded
  }
}
