<template>
  <div>
    <ul class="tr flex flex-row">
      <li class="td border-l border-b border-gray-200 w-32">
        <span v-if="state.buyers.length" @click="toggleChildrenVisible()" class="p-1 mr-1 cursor-pointer">
          <font-awesome-icon v-if="!childrenVisible" icon="caret-right" class="text-gray-500 hover:text-gray-700"></font-awesome-icon>
          <font-awesome-icon v-if="childrenVisible" icon="caret-down" class="text-gray-800"></font-awesome-icon>
        </span>
        <slot name="checkbox">
          <checkbox-field
            :field_id="type + obj.id"
            @input="check()"
            :value="checkboxState.checked"
            :indeterminate="checkboxState.indeterminate"
            :disabled="checkboxState.disabled"
          ></checkbox-field>
        </slot>
        {{type}}
      </li>
      <li class="td border-b border-gray-200 w-64">{{obj.name}}</li>
      <li class="td border-r border-b border-gray-200 w-32">{{obj.buyer_group}}</li>
    </ul>
    <div v-show="childrenVisible">
      <!-- Vue3 Migration: Refactor and use function refs. https://v3.vuejs.org/guide/composition-api-template-refs.html#usage-inside-v-for -->
      <buyer-tree-node
        v-for="buyer in state.buyers"
        :ref="buyer.id"
        :obj="buyer"
        :key="buyer.id"
        class="pl-3"></buyer-tree-node>
    </div>
  </div>
</template>

<script>
import buyerTreeNode from '@/components/buyer-groups/buyer-tree/node'
import { computed, inject, ref, reactive } from '@vue/composition-api'
import { failedToast } from '@/mixins/toast-messages'

function useChildVisibility () {
  const childrenVisible = ref(false)

  function toggleChildrenVisible () {
    childrenVisible.value = !childrenVisible.value
  }
  return {
    childrenVisible,
    toggleChildrenVisible
  }
}

function useClient (clientId, currentBuyerGroupId, refs, store) {
  const checkboxState = reactive({
    checked: computed(() => {
      return checkboxState.checkedImplied
    }),
    checkedImplied: computed(
      () => state.buyers.length > 0 && computedState.areAllBuyersInGroup
    ),
    disabled: computed(
      () => state.buyers.length === 0
    ),
    indeterminate: computed(
      () => !checkboxState.checked && computedState.buyersInGroup.length > 0 && !computedState.areAllBuyersInGroup
    )
  })
  const computedState = reactive({
    buyersInGroup: computed(
      () => state.buyers.filter(b => b.buyer_group === currentBuyerGroupId.value)
    ),
    buyersNotInGroup: computed(
      () => state.buyers.filter(b => b.buyer_group !== currentBuyerGroupId.value)
    ),
    areAllBuyersInGroup: computed(
      () => state.buyers.length === computedState.buyersInGroup.length
    )
  })
  const state = reactive({
    buyers: computed(() => store.getters.getParentlessBuyersByClient(clientId))
  })
  function check () {
    Object.keys(refs).forEach(key => {
      const buyer = refs[key][0]
      if (computedState.areAllBuyersInGroup) {
        // Runs check() on all checked buyers if all are checked
        buyer.check()
      } else if (!buyer.checkboxState.checked) {
        // Runs check() only on unchecked buyers
        buyer.check()
      }
    })
  }
  return {
    check,
    checkboxState,
    state
  }
}

function useBuyer (buyerId, currentBuyerGroupId, refs, store) {
  const checkboxState = reactive({
    checked: computed(() => {
      if (computedState.isBuyerInGroup) {
        return true
      } else return checkboxState.checkedImplied
    }),
    checkedImplied: computed(
      () => (computedState.buyersInGroup.length > 0 && computedState.areAllBuyersInGroup) ||
                    computedState.currentBuyerGroupInherited
    ),
    disabled: computed(
      () => computedState.buyerInOtherGroup ||
                   state.buyer.inherited_buyer_group !== null
    ),
    indeterminate: computed(
      () => !checkboxState.checked &&
                   computedState.buyersInGroup.length > 0 &&
                   !computedState.areAllBuyersInGroup
    )
  })
  const computedState = reactive({
    isBuyerInGroup: computed(
      () => state.buyer.buyer_group === currentBuyerGroupId.value
    ),
    buyersInGroup: computed(
      () => state.buyers.filter(b => b.buyer_group === currentBuyerGroupId.value)
    ),
    areAllBuyersInGroup: computed(
      () => state.buyers.length === computedState.buyersInGroup.length
    ),
    buyerInOtherGroup: computed(
      () => state.buyer.buyer_group !== null &&
                   state.buyer.buyer_group !== currentBuyerGroupId.value
    ),
    buyerInheritsCurrentBuyerGroup: computed(
      () => {
        if (state.buyer.inherited_buyer_group) {
          return state.buyer.inherited_buyer_group.buyer_group === currentBuyerGroupId.value
        }
      }
    )
  })
  const state = reactive({
    buyer: computed(
      () => store.getters.getBuyerById(buyerId)
    ),
    buyers: computed(
      () => store.getters.getBuyersByParent(buyerId)
    )
  })
  function check () {
    if (checkboxState.checkedImplied && !computedState.isBuyerInGroup) {
      Object.keys(refs).forEach(key => {
        const buyer = refs[key][0]
        buyer.check()
      })
    } else if (checkboxState.disabled) {
      failedToast({ heading: `The buyer '${state.buyer.name}' is assigned to '${store.getters.getCurrentBuyerGroup.name}'` })
    } else {
      const updatedBuyer = { ...state.buyer }
      updatedBuyer.buyer_group = computedState.isBuyerInGroup ? null : currentBuyerGroupId.value
      store.dispatch('updateBuyerGroupForBuyer', updatedBuyer).then(() => {
        store.commit('SET_CURRENT_INHERITED_BUYER_GROUP', null)
      })
    }
  }
  return {
    check,
    checkboxState,
    state
  }
}

export default {
  name: 'buyer-tree-node',
  props: {
    obj: Object,
    type: {
      type: String,
      default: 'buyer',
      validator: (value) => {
        return [
          'buyer',
          'client'
        ].includes(value)
      }
    }
  },
  setup (props, setupContext) {
    const store = inject('vuex-store')
    // Vue3 Migration: setupContext.refs will not be available in vue3. Refactor and use function refs. https://v3.vuejs.org/guide/composition-api-template-refs.html#usage-inside-v-for
    const refs = setupContext.refs

    const { childrenVisible, toggleChildrenVisible } = useChildVisibility()

    const currentBuyerGroupId = computed(() => store.getters.getCurrentBuyerGroup.id)
    const { check, checkboxState, state } =
      props.type === 'client'
        ? useClient(props.obj.id, currentBuyerGroupId, refs, store)
        : useBuyer(props.obj.id, currentBuyerGroupId, refs, store)

    return {
      check,
      checkboxState,
      childrenVisible,
      state,
      toggleChildrenVisible
    }
  },
  components: {
    'buyer-tree-node': buyerTreeNode
  }
}
</script>
