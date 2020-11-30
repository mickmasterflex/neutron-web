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
    <div v-if="childrenVisible">
      <buyer-tree-node v-for="buyer in state.buyers" :obj="buyer" :key="buyer.id" class="pl-3"></buyer-tree-node>
    </div>
  </div>
</template>

<script>
import buyerTreeNode from '@/components/buyer-groups/buyer-tree/node'
import { computed, inject, ref, reactive } from '@vue/composition-api'

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

function useClient (clientId, currentBuyerGroupId) {
  const store = inject('vuex-store')
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
      () => computedState.buyersInGroup.length > 0 && !computedState.areAllBuyersInGroup
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
    if (computedState.areAllBuyersInGroup === true) {
      computedState.buyersInGroup.forEach(buyer => {
        const updatedBuyer = { ...buyer }
        updatedBuyer.buyer_group = null
        store.dispatch('updateBuyer', updatedBuyer)
      })
    } else {
      computedState.buyersNotInGroup.forEach(buyer => {
        const updatedBuyer = { ...buyer }
        updatedBuyer.buyer_group = currentBuyerGroupId.value
        store.dispatch('updateBuyer', updatedBuyer)
      })
    }
  }
  return {
    check,
    checkboxState,
    state
  }
}

function useBuyer (buyerId, currentBuyerGroupId) {
  const store = inject('vuex-store')
  const checkboxState = reactive({
    checked: computed(() => {
      if (computedState.isBuyerInGroup) {
        return true
      } else return checkboxState.checkedImplied
    }),
    checkedImplied: computed(
      () => computedState.buyersInGroup.length > 0 && computedState.areAllBuyersInGroup
    ),
    // disabled: computed(() => buyer.buyer_group.inherited),
    indeterminate: computed(
      () => computedState.buyersInGroup.length > 0 && !computedState.areAllBuyersInGroup
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
    const updatedBuyer = { ...state.buyer }
    updatedBuyer.buyer_group = computedState.isBuyerInGroup ? null : currentBuyerGroupId.value
    store.dispatch('updateBuyer', updatedBuyer)
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
  setup (props) {
    const store = inject('vuex-store')
    const { childrenVisible, toggleChildrenVisible } = useChildVisibility()

    const currentBuyerGroupId = computed(() => store.getters.getCurrentBuyerGroup.id)
    const { check, checkboxState, state } =
      props.type === 'client'
        ? useClient(props.obj.id, currentBuyerGroupId)
        : useBuyer(props.obj.id, currentBuyerGroupId)

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
