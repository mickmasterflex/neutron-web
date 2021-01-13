import { computed, reactive } from '@vue/composition-api'

export default function useClient (clientId, store) {
  const state = reactive({
    children: computed(() => store.getters.getParentlessBuyersByClient(clientId))
  })
  return {
    state
  }
}
