import { computed, ref, reactive } from '@vue/composition-api'

export default function useExpandTr (hasChildren, hasUserFeedback) {
  const expandedState = reactive({
    expanded: ref(false),
    expandable: computed(() => {
      return hasChildren || hasUserFeedback
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
